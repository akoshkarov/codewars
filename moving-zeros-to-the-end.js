var moveZeros = arr =>
  arr
    .reverse()
    .reduce(
      (acc, value) => (value === 0 ? acc.concat(value) : [value].concat(acc)),
      []
    );

// console.log(moveZeros([1, 2, 0, 1, 0, 1, 0, 3, 0, 1]));
