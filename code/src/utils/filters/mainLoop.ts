import { buffer } from "stream/consumers";
import { T_ParsedUserRecord } from "../../types/UserRecord";
import { deltaDateChecker } from "../deltaDateChecker";
import { checkIfIncrementable } from "./checkIfIncrementable";
import { keepLastTwoElements } from "../keepLastTwoElements";

export const mainLoop = (
  sessionArray: T_ParsedUserRecord[],
  sessionID: string
) => {
  let life = 2;
  let lastSeriesMemory = 0;
  let sameDayBuffer = [];
  let consecutiveDaysWithIncrement = 0;
  let hasIncrementedLastTime = false;
  let loseALifeLastTime = false;
  let hasIncrementedToday = false;
  sessionArray.forEach((session) => {
    if (life < 2 && consecutiveDaysWithIncrement === 5) {
      life++;
    }
    let actualSeries = lastSeriesMemory;
    session.series = lastSeriesMemory;
    sameDayBuffer.push(session.date);
    keepLastTwoElements(sameDayBuffer);
    let dateCheckerRes = deltaDateChecker(sameDayBuffer);
    if (dateCheckerRes === null) {
      if (checkIfIncrementable(session, lastSeriesMemory)) {
        consecutiveDaysWithIncrement++;
        hasIncrementedLastTime = true;
      }
    } else if (dateCheckerRes === 0) {
      if (!hasIncrementedToday) {
        checkIfIncrementable(session, lastSeriesMemory);
      }
      //les dates du buffer sont du même jour
      // console.log("SAME DAY", session.formattedDate, dateCheckerRes);
    } else if (dateCheckerRes === 1) {
      if (checkIfIncrementable(session, lastSeriesMemory)) {
        consecutiveDaysWithIncrement++;
        hasIncrementedLastTime = true;
      }
      if (!hasIncrementedLastTime) {
        checkIfIncrementable(session, lastSeriesMemory);
      }
      //un jour d'écard entre les deux dernières dates du buffer
      // console.log("UN JOUR EST PASSE", session.formattedDate, dateCheckerRes);
    } else {
      //plus de 1 j d'écart entre les deux dernières dates du buffer
      if (dateCheckerRes === 2) {
        // console.log("MOINS UNE VIE", session.formattedDate, dateCheckerRes);
        if (life > 0) {
          // -1
          life -= 1;
          loseALifeLastTime = true;
        } else {
          loseALifeLastTime = true;
          // console.log("VIE DEJA A 0", session.formattedDate, dateCheckerRes);
        }
      }
      if (dateCheckerRes > 2) {
        loseALifeLastTime = true;
        // console.log("VIE A 0", session.formattedDate, dateCheckerRes);
        life = 0;
      }
    }
  });
};
