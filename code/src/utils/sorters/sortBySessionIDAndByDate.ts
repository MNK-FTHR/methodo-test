import { T_ParsedUserRecord } from "../../types/UserRecord";

export const sortBySessionIDAndByDate = (data: T_ParsedUserRecord[]) => {
  data.sort((a, b) => {
    const aIsNumeric = /^\d+$/.test(a.sessionID);
    const bIsNumeric = /^\d+$/.test(b.sessionID);

    if (aIsNumeric && bIsNumeric) {
      // Si les deux sont numériques, les comparer comme des nombres
      const sessionComparison = Number(a.sessionID) - Number(b.sessionID);
      if (sessionComparison !== 0) {
        return sessionComparison;
      }
    } else if (aIsNumeric) {
      // Si seulement a est numérique, il vient avant b
      return -1;
    } else if (bIsNumeric) {
      // Si seulement b est numérique, il vient avant a
      return 1;
    } else {
      // Sinon, comparer comme des chaînes de caractères
      const sessionComparison = a.sessionID.localeCompare(b.sessionID);
      if (sessionComparison !== 0) {
        return sessionComparison;
      }
    }
    // Si les sessionID sont égaux, comparer par date
    return a.date - b.date;
  });
  return data;
};
