import { T_ParsedUserRecord } from "../../types/UserRecord";
import { checkIfIncrementable } from "./checkIfIncrementable";
import { dayDifferenceBetweenDates } from "./dayDifferenceBetweenDates";

export const mainLoop = (
  sessionArray: T_ParsedUserRecord[],
  sessionID: string
) => {
  let life = 2;
  let lastSeriesMemory = 0;
  let sameDayBuffer = [];
  sessionArray.forEach((session) => {
    let actualSeries = lastSeriesMemory;
    session.series = lastSeriesMemory;
    sameDayBuffer.push(session.date);
    if (sameDayBuffer.length > 1) {
      session.series = checkIfIncrementable(session, true);
    } else {
      session.series = checkIfIncrementable(session, false);
    }
  });
};
