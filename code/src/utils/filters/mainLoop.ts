import { T_ParsedUserRecord } from "../../types/UserRecord";
import { deltaDateChecker } from "../deltaDateChecker";
import { checkIfIncrementable } from "./checkIfIncrementable";
import { dayDifferenceBetweenDates } from "./dayDifferenceBetweenDates";

export const mainLoop = (
  sessionArray: T_ParsedUserRecord[],
  sessionID: string
) => {
  let life = 2;
  let lastSeriesMemory = 0;
  let sameDayBuffer = [];
  console.log("SESSIONID: ", sessionID);

  sessionArray.forEach((session) => {
    let actualSeries = lastSeriesMemory;
    session.series = lastSeriesMemory;
    sameDayBuffer.push(session.date);
    if (sameDayBuffer.length > 1) {
      deltaDateChecker(sameDayBuffer);
      session.series = checkIfIncrementable(session);
    } else {
      //seule date du buffer pas besoin de comparer (soit c'est la première data de la session soit le buffer a été clear)
      session.series = checkIfIncrementable(session);
    }
  });
};
