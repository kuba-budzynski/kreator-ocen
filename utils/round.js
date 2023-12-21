export const round = (price, to = 100, down = 30) => {
  return parseFloat(price).toFixed(2);
  if (Math.floor(price % to) < down) {
    return Math.floor(price / to) * to;
  } else return Math.ceil(price / to) * to;
};
