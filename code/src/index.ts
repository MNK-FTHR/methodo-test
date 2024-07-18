import * as fs from "fs";
import { sortAddSerieAndCreateTheCSV } from "./sortAddSerieAndCreateTheCSV";
import { transformUserRecordUP } from "./utils/transformUserRecords";
import { T_UserRecord } from "./types/UserRecord";

const csvFilePath = process.argv[2];

async function readFileAsync(
  path: fs.PathOrFileDescriptor,
  options: BufferEncoding
): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * const r = read();
 * const parsed = parse(r);
 * const csv = convert(parsed);
 * write(csv);
 */
(async () => {
  try {
    // read
    const data = await readFileAsync(csvFilePath, "utf8");

    // parsed
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

    // parsed + convert ?
    const ReadableCSVContent = transformUserRecordUP(result);

    // convert + write
    sortAddSerieAndCreateTheCSV(ReadableCSVContent);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier:", error);
    process.exit(1);
  }
})();
