import { T_ParsedUserRecord } from "../../types/UserRecord";

export const checkIfIncrementable = (
  session: T_ParsedUserRecord,
  lastSeriesMemory: number
) => {
  //2 TRUE TRUE
  if (session.niveau === 2 && session.assis && session.allonge) {
    lastSeriesMemory = lastSeriesMemory + 1;
    session.series = lastSeriesMemory;
    return true;
  }
  //1 TRUE TRUE
  //1 TRUE FALSE
  //1 FALSE TRUE
};
