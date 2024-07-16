import * as fs from "fs";
import { sortAddSerieAndCreateTheCSV } from "./sortAddSerieAndCreateTheCSV";
import { transformUserRecordUP } from "./utils/transformUserRecords";
import { T_UserRecord } from "./types/UserRecord";

const csvFilePath = process.argv[2];

fs.readFile(csvFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Erreur lors de la lecture du fichier:", err);
    return;
  }

  const lines = data.split("\n");
  const headers = lines[0].split(",");

  const result: T_UserRecord[] = lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: T_UserRecord = {
      '"Date"': "",
      '"Niveau"': "",
      '"Allonge"': "",
      '"Assis"': "",
      '"SessionID"': "",
      '"formattedDate"': "",
    };
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });

  const ReadableCSVContent = transformUserRecordUP(result);

  sortAddSerieAndCreateTheCSV(ReadableCSVContent);
});
