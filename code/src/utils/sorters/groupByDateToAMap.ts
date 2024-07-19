import { T_ParsedUserRecord } from "../../types/UserRecord";

export function groupByDate(
  records: T_ParsedUserRecord[]
): Map<string, T_ParsedUserRecord[]> {
  const groupedRecords = new Map<string, T_ParsedUserRecord[]>();

  records.forEach((record) => {
    if (!groupedRecords.has(record.formattedDate)) {
      groupedRecords.set(record.formattedDate, []);
    }
    groupedRecords.get(record.formattedDate)!.push(record);
  });

  return groupedRecords;
}
