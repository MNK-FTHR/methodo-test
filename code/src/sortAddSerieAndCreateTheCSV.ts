import * as fs from "fs";
import { T_ParsedUserRecord } from "./types/UserRecord";
import { transformUserRecordDOWN } from "./utils/transformUserRecords";
import { sortAndAddSerie } from "./utils/sortAndAddSerie";

export const sortAddSerieAndCreateTheCSV = (data: T_ParsedUserRecord[]) => {
  const datatToPrint = sortAndAddSerie(data);
  const csvContent = transformUserRecordDOWN(datatToPrint);
  fs.writeFileSync("./output.csv", csvContent.join(""));
};