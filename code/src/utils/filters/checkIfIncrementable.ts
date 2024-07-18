import { T_ParsedUserRecord } from "../../types/UserRecord";

export const checkIfIncrementable = (
  session: T_ParsedUserRecord,
  ifistrue: boolean
) => {
  if (ifistrue) {
    return 1;
  } else {
    return 0;
  }
};
