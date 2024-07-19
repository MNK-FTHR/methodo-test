export type T_UserRecord = {
  '"Date"': string;
  '"Niveau"': string;
  '"Allonge"': string;
  '"Assis"': string;
  '"SessionID"': string;
  '"formattedDate"': string;
};

export type T_ParsedUserRecord = {
  date: number;
  niveau: number;
  allonge: boolean;
  assis: boolean;
  sessionID: string;
  formattedDate: string;
  series: number;
};
