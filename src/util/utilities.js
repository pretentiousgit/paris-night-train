function range(x) {
  const arr = [];
  for (let i = 0; i < x; i += 1) {
    arr.push(0);
  }
  return arr;
}

/* disable-eslint */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}
/* enable-eslint */

export {
  range,
  getRandomIntInclusive
};