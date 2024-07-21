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
  allongeTime: number;
  assis: boolean;
  assisTime: number;
  sessionID: string;
  formattedDate: string;
  serie: number;
};
