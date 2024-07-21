import { T_ParsedUserRecord } from "../../types/UserRecord";

export const checkIfIncrementable = (sessions: T_ParsedUserRecord[]) => {
  let incrAt: number;
  let alreadyIncrementedDateForToday = false;
  let totalExercicesTime = sessions.reduce(
    (accumulator, current) => {
      accumulator.allongeTime += current.allongeTime;
      accumulator.assisTime += current.assisTime;

      if (accumulator.allongeTime >= 10 && accumulator.assisTime >= 10) {
        if (!alreadyIncrementedDateForToday) {
          alreadyIncrementedDateForToday = true;
          incrAt = current.date;
        }
      }
      return accumulator;
    },
    { allongeTime: 0, assisTime: 0 }
  );
  if (
    totalExercicesTime.allongeTime >= 10 &&
    totalExercicesTime.assisTime >= 10
  ) {
    return incrAt;
  } else {
    return false;
  }
};
