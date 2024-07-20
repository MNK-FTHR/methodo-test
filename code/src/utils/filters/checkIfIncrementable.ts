import { T_ParsedUserRecord } from "../../types/UserRecord";

export const checkIfIncrementable = (sessions: T_ParsedUserRecord[]) => {
  let incrAt: number;
  let totalAssisTime = sessions.reduce((accumulator, current) => {
    let output = accumulator + current.allongeTime;
    return output;
  }, 0);
  let totalAllongeTime = sessions.reduce((accumulator, current) => {
    let output = accumulator + current.allongeTime;
    if (accumulator + current.allongeTime >= 10) {
      incrAt = current.date;
    }
    return output;
  }, 0);
  if (totalAllongeTime >= 10 && totalAssisTime >= 10) {
    return incrAt;
  } else {
    return false;
  }
};
