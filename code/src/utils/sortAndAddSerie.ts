import { T_ParsedUserRecord } from "../types/UserRecord";
import { mainLoop } from "./filters/mainLoop";

export const sortAndAddSerie = (data: T_ParsedUserRecord[]) => {
  const sessionsByID = new Map<string, T_ParsedUserRecord[]>();
  data.forEach((session) => {
    if (!sessionsByID.has(session.sessionID)) {
      sessionsByID.set(session.sessionID, []);
    }
    sessionsByID.get(session.sessionID)?.push(session);
  });
  sessionsByID.forEach(mainLoop);
  const dataToReturn: T_ParsedUserRecord[] = Array.from(
    sessionsByID.values()
  ).flat();
  // 4each sessionID get datas, init life and run inside
  // get first data date and store it
  // check if serie is incrementable
  return dataToReturn;
};
