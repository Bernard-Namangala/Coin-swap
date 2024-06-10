export const roundToThreeDecimalPlaces = (num: number): string => {
  if (Math.abs(num) < 1e-3 && num !== 0) {
    return num.toString();
  }

  let rounded = num.toFixed(3);

  let formatted = parseFloat(rounded).toString();

  return formatted;
};
