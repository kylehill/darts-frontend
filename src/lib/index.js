export const updateObject = (baseObject, key, newValue) => {
  if (newValue === undefined) {
    return Object.entries(baseObject).reduce((mem, [k, v]) => {
      if (k !== key) {
        mem[k] = v;
      }

      return mem;
    }, {});
  }

  const newObject = Object.entries(baseObject).reduce((mem, [k, v]) => {
    mem[k] = v;
    return mem;
  }, {});

  newObject[key] = newValue;
  return newObject;
};
