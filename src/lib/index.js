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

export const timeout = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const pick = (array) => {
  if (!array.length) {
    return undefined;
  }
  return array[Math.floor(Math.random() * array.length)];
};

export const fromCamelCase = (text) => {
  return text
    .split("-")
    .map((word) => {
      return word[0].toUpperCase() + word.split("").slice(1).join("").toLowerCase();
    })
    .join(" ");
};
