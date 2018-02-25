
function range(x) {
  const arr = [];
  for (let i = 0; i < x; i += 1) {
    arr.push(0);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}


function stringArray(x, stringFn) {
  const c = [];
  for (let i = 0, l = x.length; i < l; i += 1) {
    const str = stringFn();

    if (c.indexOf(str) === -1) {
      c.push(str);
    }
  }
  return c;
}

export {
  range,
  getRandomIntInclusive,
  stringArray
};

