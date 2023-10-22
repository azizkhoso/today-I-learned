function clone(obj, isStrictlySafe = false) {
  /* Clones an object. First attempt is safe. If it errors (e.g. from a circular reference),
        'isStrictlySafe' determines if error is thrown or an unsafe clone is returned. */
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (err) {
    if (isStrictlySafe) { throw new Error(err) }
    console.warn(`Unsafe clone of object`, obj);
    return { ...obj };
  }
}

function merge(target, source, { isMutatingOk = false, isStrictlySafe = false } = {}) {
  /* Returns a deep merge of source into target.
        Does not mutate target unless isMutatingOk = true. */
  target = isMutatingOk ? target : clone(target, isStrictlySafe);
  for (const [key, val] of Object.entries(source)) {
    if (val !== null && typeof val === `object`) {
      if (target[key] === undefined) {
        target[key] = new val.__proto__.constructor();
      }
      /* even where isMutatingOk = false, recursive calls only work on clones, so they can always
            safely mutate --- saves unnecessary cloning */
      target[key] = merge(target[key], val, { isMutatingOk: true, isStrictlySafe });
    } else {
      target[key] = val;
    }
  }
  return target;
}

function convertToObject(keyString = '', value, parent) {
  if (!keyString || keyString.length === 0) throw Error('"keyString" can not be empty');
  const keys = keyString.split('.').reverse();
  let tempObj;
  keys.forEach((key, index) => {
    const obj = {};
    const isArray = key.includes('[');
    if (isArray) {
      const arrayNotationIndex = key.indexOf('[');
      const keyName = key.slice(0, arrayNotationIndex);
      const arrayNotation = key.slice(arrayNotationIndex);
      const indices = []; // indices in reverse order
      let currentIndexStr = '';
      for (let i = 0; i < arrayNotation.length; i += 1) {
        const char = arrayNotation[i];
        if (char === ']') {
          if (Number.isNaN(Number(currentIndexStr))) throw Error('Invalid index number');
          indices.unshift(Number(currentIndexStr));
          currentIndexStr = '';
        } else if (char === '[') continue;
        else currentIndexStr += char;
      }
      let tempArr = [];
      for (let j = 0; j < indices.length; j += 1) {
        if (j === 0) {
          tempArr[indices[j]] = tempObj || value;
        } else {
          let parentArr = [];
          parentArr[indices[j]] = tempArr;
          tempArr = parentArr;
        }
      }
      obj[keyName] = tempArr;
      tempObj = obj;
    } else {
      if (index === 0) {
        obj[key] = value;
        tempObj = obj;
      } else {
        obj[key] = tempObj;
        tempObj = obj;
      }
    }
  })
  return tempObj;
}

function parse(map = {}) {
  const keys = Object.keys(map);
  if (!keys.length) return {};
  let resultObject = {};
  keys.forEach((key) => {
    const res = convertToObject(key, map[key]);
    resultObject = merge(resultObject, res, { isMutatingOk: false, isStrictlySafe: true });
  });
  return resultObject;
}

const test = {
  'a.b': 'khoso',
  'a.c': 9,
  'a.d': 10,
  'a.s[0]': '1',
  'a.s[1]': '3',
  'b[0][0]': 5,
  'b[0][1]': 6,
  'b[1][0]': 7,
  'b[1][1]': 8,
  'c[0].b': true,
  'c[0].e': 'e',
  'c[0].f': false,
  'c[0].d[0][0].a[0]': 1,
  'c[0].d[0][1].b[1]': 5,
  'c[0].d[1][0].c[2]': 9,
  'c[0].d[1][1].e[3]': 10,
}

console.log(JSON.stringify(parse(test), null, 2));