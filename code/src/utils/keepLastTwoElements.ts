export function keepLastTwoElements<T>(array: T[]): T[] {
  if (array.length <= 2) {
    return array;
  }
  return array.slice(-2);
}
