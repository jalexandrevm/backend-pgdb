export function CheckStringPositiveNumber(value: string): boolean {
  const codNum = Number(value);
  if (isNaN(codNum) || codNum <= 0) {
    return false;
  }
  return true;
}
