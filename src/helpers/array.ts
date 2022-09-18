export const findCommonElements = (array1: [], array2: []) => {
  return array1.some((item) => array2.includes(item));
};

export const removeItemFromArray = (index: number, array: []) => {
  if (index > -1) {
    return array.splice(index, 1);
  }
  return array;
};
