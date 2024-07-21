import { T_UserRecord, T_ParsedUserRecord } from "../types/UserRecord";

export function transformObjectUP(input: T_UserRecord): T_ParsedUserRecord {
  for (var key in input) {
    if (input[key] === undefined) {
      return undefined;
    }
  }
  let newVal = {
    date: Number(input['"Date"'].replace(/"/g, "")),
    niveau:
      input['"Niveau"'] === ""
        ? null
        : Number(input['"Niveau"'].replace(/"/g, "")),
    allonge:
      input['"Allonge"'] === ""
        ? false
        : input['"Allonge"'].replace(/"/g, "").toLowerCase() === "true",
    allongeTime: 0,
    assis:
      input['"Assis"'] === ""
        ? false
        : input['"Assis"'].replace(/"/g, "").toLowerCase() === "true",
    assisTime: 0,
    sessionID: input['"SessionID"'].replace(/"/g, ""),
    formattedDate:
      input['"formattedDate"'] === ""
        ? new Date(
            Number(input['"Date"'].replace(/"/g, "")) * 1000
          ).toLocaleDateString("fr-EU")
        : input['"formattedDate"'].replace(/"/g, ""),
    serie: 0,
  };
  if (newVal.niveau === 2) {
    newVal.allonge && (newVal.allongeTime = 10);
    newVal.assis && (newVal.assisTime = 10);
  }
  if (newVal.niveau === 1) {
    newVal.allonge && (newVal.allongeTime = 5);
    newVal.assis && (newVal.assisTime = 5);
  }
  return newVal;
}

export const transformUserRecordUP = (data: string): T_ParsedUserRecord[] => {
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
  const parsedAndConvertedData = [];
  for (let index = 0; index < result.length; index++) {
    const element = transformObjectUP(result[index]);
    element !== undefined && parsedAndConvertedData.push(element);
  }
  return parsedAndConvertedData;
};

function transformObjectDOWN(input: T_ParsedUserRecord): string {
  return `"${input.date}","${input.niveau}","${
    input.allonge ? "True" : "False"
  }","${input.assis ? "True" : "False"}","${input.sessionID}","${
    input.formattedDate
  }","${input.serie}"\n`;
}

export const transformUserRecordDOWN = (
  input: T_ParsedUserRecord[]
): string[] => {
  const result = [
    `"Date","Niveau","Allonge","Assis","SessionID","formattedDate","Serie"\n`,
  ];
  for (let index = 0; index < input.length; index++) {
    const element = transformObjectDOWN(input[index]);
    element !== undefined && result.push(element);
  }
  return result;
};
