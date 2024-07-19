import * as fs from "fs";
import { sortAddSerieAndCreateTheCSV } from "./sortAddSerieAndCreateTheCSV";
import { transformUserRecordUP } from "./utils/transformUserRecords";

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

    // parsed + converted
    const ReadableCSVContent = transformUserRecordUP(data);

    // convert + write
    sortAddSerieAndCreateTheCSV(ReadableCSVContent);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier:", error);
    process.exit(1);
  }
})();
