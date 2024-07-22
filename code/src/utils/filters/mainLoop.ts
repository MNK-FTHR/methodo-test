import { T_ParsedUserRecord } from "../../types/UserRecord";
import { deltaDateChecker } from "../deltaDateChecker";
import { groupByDate } from "../sorters/groupByDateToAMap";
import { checkIfIncrementable } from "./checkIfIncrementable";

export const mainLoop = (
  sessionArray: T_ParsedUserRecord[],
  sessionID: string
) => {
  let groupRecord = groupByDate(sessionArray); //renvoit une Map key: uniqueDate value: T_ParsedUserRecord[]
  let lastserie = 0; // se rappelle de la valeur de la série de la session précédente
  let life = 2;
  let daysWithoutLosingLife = 0;
  let dayBuffer = []; // stock les deux dernière dates unique de l'utilisateur
  groupRecord.forEach((value, key, map) => {
    // pour chaque date unique
    dayBuffer.push(key); // ajoute la date unique au buffer
    if (dayBuffer.length > 2) {
      // s'il y a plus de deux jours dans le buffer, supprime le premier
      dayBuffer.shift();
    }
    if (key !== groupRecord.keys().next().value) {
      // regarde le nombre de jour de différence entre les deux jours du buffer si plus de deux jours sont passés
      // si plus d'un jour est passé, on supprime d'office les vies (forcement minimum 2 donc on set @ 0)
      // si un seul jour est passé, on laisse l'algo décider
      if (deltaDateChecker(dayBuffer) > 3) {
        // regarde le nombre de jour de différence entre les deux jours du buffer
        life = 0;
        lastserie = 0;
        daysWithoutLosingLife = 0;
      }
      if (deltaDateChecker(dayBuffer) == 3) {
        // regarde le nombre de jour de différence entre les deux jours du buffer
        if (life > 0) {
          life--;
          life--;
          daysWithoutLosingLife = 0;
        }
      }
      if (deltaDateChecker(dayBuffer) == 2) {
        // regarde le nombre de jour de différence entre les deux jours du buffer
        if (life > 0) {
          life--;
          daysWithoutLosingLife = 0;
        }
      }
    }
    if (checkIfIncrementable(value)) {
      // add le temps d'exo et incrément en fonction
      let byThisOne = value.find(
        ({ date }) => date === checkIfIncrementable(value)
      );
      value.map((x: T_ParsedUserRecord, i) => {
        if (x.date >= byThisOne.date) {
          x.serie = lastserie + 1; //incrémente à partir du moment ou le temps voulu est reached
        } else {
          x.serie = lastserie; //met la valeur de la dernière série au données d'avant la date
        }
      });
      lastserie++; // met à jour la dernière série en mémoire
      daysWithoutLosingLife++;
      if (daysWithoutLosingLife % 5 === 0 && life < 2) {
        life++; // si la série est modulo 5 et que life est <2, régen
      }
    } else {
      if (life > 0) {
        life--; //s'il n'arrive pas à reach le temps de chaque exo, --vie
      } else {
        lastserie = 0;
      }
      daysWithoutLosingLife = 0;
      value.map((x: T_ParsedUserRecord, i) => {
        x.serie = lastserie; //met la valeur de la dernière série
      });
    }
  });
};
