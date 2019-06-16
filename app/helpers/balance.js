const MIN_FRACTION_DIGITS = 3;
const MAX_FRACTION_DIGITS = 9;

export const floorLocalFloatAmount = (val, decimals = MIN_FRACTION_DIGITS) => {
  // eslint-disable-next-line prefer-template
  const floorFloatAmount = Number(Math.floor(Number.parseFloat(val).toFixed(MAX_FRACTION_DIGITS) + 'e' + decimals) + 'e-' + decimals);

  return floorFloatAmount.toLocaleString();
};

const K_VAL = 1000;
const K_SYMBOL = 'K';
export const floorLocalAmountToK = (value, decimals) => {
  if (value > K_VAL) {
    return `${floorLocalFloatAmount(value / K_VAL, decimals)} ${K_SYMBOL}`;
  }

  return floorLocalFloatAmount(value, decimals);
};
