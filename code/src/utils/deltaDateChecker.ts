export const deltaDateChecker = (sameDayBuffer: number[]): number | null => {
  if (sameDayBuffer.length === 1) {
    return null;
  } else {
    const lastTimestamp = new Date(
      sameDayBuffer[sameDayBuffer.length - 1] * 1000
    );
    const secondLastTimestamp = new Date(
      sameDayBuffer[sameDayBuffer.length - 2] * 1000
    );
    const diffTime = Math.abs(
      lastTimestamp.getTime() - secondLastTimestamp.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isSameDay =
      lastTimestamp.getDate() === secondLastTimestamp.getDate() &&
      lastTimestamp.getMonth() === secondLastTimestamp.getMonth() &&
      lastTimestamp.getFullYear() === secondLastTimestamp.getFullYear();
    if (isSameDay) {
      return 0;
    } else {
      if (diffDays > 1) {
        return diffDays;
      } else {
        return 1;
      }
    }
  }
};
