export const deltaDateChecker = (sameDayBuffer: number[]) => {
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
    console.log(`same day ${lastTimestamp} et ${secondLastTimestamp} \n`);
  } else {
    if (diffDays > 1) {
      console.log(
        `il y a ${diffDays} j de diff entre ${lastTimestamp} et ${secondLastTimestamp} \n`
      );
    } else {
      console.log(
        `une j de diff ${lastTimestamp} et ${secondLastTimestamp} \n`
      );
    }
  }
};
