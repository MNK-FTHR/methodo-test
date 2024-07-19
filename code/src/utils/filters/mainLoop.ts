import { T_ParsedUserRecord } from "../../types/UserRecord";
import { groupByDate } from "../sorters/groupByDateToAMap";
import { checkIfIncrementable } from "./checkIfIncrementable";

export const mainLoop = (
  sessionArray: T_ParsedUserRecord[],
  sessionID: string
) => {
  // merge those who are the same day
  //    calcul equivalent in minut for the exo time in each day
  // iterate through day instead of record
  //    first day go classic
  //      if (assis >= 10 && allonge >= 10) series++ && consecutiveDaySerie++ : series = 0 && consecutiveDaySerie = 0 && life--
  //    byNow
  //      calculateDeltaTimeWithLastDay() => Dtime > 1 && life - deltatime (floor 0)
  //      if (assis >= 10 && allonge >= 10) series++ && consecutiveDaySerie++ : series = 0 && consecutiveDaySerie = 0 && life--
  //      checkIfLifeIsRegenerable()
  let groupRecord = groupByDate(sessionArray);
  groupRecord.forEach((value, key, map) => {
    if (key === groupRecord.keys().next().value) {
      // first item
      //arraysum de allongeTime et assisTime >= 10 each
    }
  });
  // sessionArray.forEach((session) => {
  //   checkIfIncrementable(session, sessionDataManager);
  // });
};
