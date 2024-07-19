import { T_ParsedUserRecord } from "../../types/UserRecord";

export const checkIfIncrementable = (
  session: T_ParsedUserRecord,
  sessionDataManager
) => {
  //2 TRUE TRUE
  if (session.niveau === 2 && session.assis && session.allonge) {
    return true;
  }
  //2 TRUE FALSE
  if (session.niveau === 2 && session.assis && !session.allonge) {
    if (sessionDataManager.twoFalseTrueValidated) {
      return true;
    }
  }
  //2 FALSE TRUE
  if (session.niveau === 2 && !session.assis && session.allonge) {
    if (sessionDataManager.twoTrueFalseValidated) {
      return true;
    }
  }
  //1 TRUE TRUE
  if (session.niveau === 1 && session.assis && session.allonge) {
    if (!sessionDataManager.oneTrueTrueValidated) {
      if (sessionDataManager.oneTrueTrue) {
        return true;
      } else {
        sessionDataManager.oneTrueTrue = true;
      }
    }
  }
  //1 TRUE FALSE
  if (session.niveau === 1 && session.assis && !session.allonge) {
    if (!sessionDataManager.oneTrueFalseValidated) {
      if (sessionDataManager.oneTrueFalse) {
        sessionDataManager.oneTrueFalseValidated = true;
        if (
          sessionDataManager.oneTrueFalseValidated &&
          sessionDataManager.oneFalseTrueValidated
        ) {
          return true;
        }
      } else {
        sessionDataManager.oneTrueFalse = true;
      }
    }
  }
  //1 FALSE TRUE
  if (session.niveau === 1 && !session.assis && session.allonge) {
    if (!sessionDataManager.oneFalseTrueValidated) {
      if (sessionDataManager.oneFalseTrue) {
        sessionDataManager.oneFalseTrueValidated = true;
        if (
          sessionDataManager.oneTrueFalseValidated &&
          sessionDataManager.oneFalseTrueValidated
        ) {
          return true;
        }
      } else {
        sessionDataManager.oneFalseTrue = true;
      }
    }
  }
  return false;
};
