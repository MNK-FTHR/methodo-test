export const deltaDateChecker = (dates: string[]): number => {
  // Vérifie que le tableau contient exactement deux dates
  if (dates.length !== 2) {
    throw new Error("Le tableau doit contenir exactement deux dates.");
  }

  // Convertit les chaînes de caractères en objets Date
  function parseDate(dateString: string): Date {
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Les mois en JS sont de 0 à 11
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  const date1 = parseDate(dates[0]);
  const date2 = parseDate(dates[1]);

  // Calcule la différence en jours
  const diffTime: number = date2.getTime() - date1.getTime();
  const diffDays: number = diffTime / (1000 * 60 * 60 * 24);

  return diffDays;
};
