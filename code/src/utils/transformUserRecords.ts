import { T_UserRecord, T_ParsedUserRecord } from "../types/UserRecord";

export function transformObjectUP(input: T_UserRecord): T_ParsedUserRecord {
  for (var key in input) {
    if (input[key] === undefined) {
      return undefined;
    }
  }
  return {
    date: Number(input['"Date"'].replace(/"/g, "")),
    niveau:
      input['"Niveau"'] === ""
        ? null
        : Number(input['"Niveau"'].replace(/"/g, "")),
    allonge:
      input['"Allonge"'] === ""
        ? false
        : input['"Allonge"'].replace(/"/g, "").toLowerCase() === "true",
    assis:
      input['"Assis"'] === ""
        ? false
        : input['"Assis"'].replace(/"/g, "").toLowerCase() === "true",
    sessionID: input['"SessionID"'].replace(/"/g, ""),
    formattedDate:
      input['"formattedDate"'] === ""
        ? new Date(parseInt("1720701400") * 1000).toLocaleDateString("fr-EU")
        : input['"formattedDate"'].replace(/"/g, ""),
    series: 0,
  };
}

export const transformUserRecordUP = (
  input: T_UserRecord[]
): T_ParsedUserRecord[] => {
  const result = [];
  for (let index = 0; index < input.length; index++) {
    const element = transformObjectUP(input[index]);
    element !== undefined && result.push(element);
  }
  return result;
};

function transformObjectDOWN(input: T_ParsedUserRecord): string {
  return `"${input.date}","${input.niveau}","${
    input.allonge ? "True" : "False"
  }","${input.assis ? "True" : "False"}","${input.sessionID}","${
    input.formattedDate
  }","${input.series}"\n`;
}

export const transformUserRecordDOWN = (
  input: T_ParsedUserRecord[]
): string[] => {
  const result = [
    `"Date","Niveau","Allonge","Assis","SessionID","formattedDate","Series"\n`,
  ];
  for (let index = 0; index < input.length; index++) {
    const element = transformObjectDOWN(input[index]);
    element !== undefined && result.push(element);
  }
  return result;
};
