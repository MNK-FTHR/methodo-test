import { T_ParsedUserRecord } from "../../types/UserRecord";

export const checkIfIncrementable = (session: T_ParsedUserRecord) => {
  //2 TRUE TRUE
  //1 TRUE TRUE
  //1 TRUE FALSE
  //1 FALSE TRUE
  return 1;
};
