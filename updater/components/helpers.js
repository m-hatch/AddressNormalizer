export const compare = (obj1, obj2) => {
  // Note: we cannot use lodash isEqual because the objects are instances of different classes
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

export default {
  compare
};
