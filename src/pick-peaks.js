function pickPeaks(arr) {
    let pos = [],
        peaks = [];
    for (let i = 1; i < arr.length - 1; i++) {
        if (
            arr[i] > arr[i - 1] &&
            (arr[i] > arr[i + 1] ||
                (arr[i] === arr[i + 1] && isThenGoesDown(arr[i], i + 2, arr)))
        ) {
            pos.push(i);
            peaks.push(arr[i]);
        }
    }
    return { pos, peaks };
}

function isThenGoesDown(value, index, arr) {
    for (let i = index; i < arr.length; i++) {
        if (arr[i] != value) {
            return value > arr[i];
        }
    }
    return false;
}

console.log(pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3])); //{pos:[3,7],peaks:[6,3]}
console.log(pickPeaks([1, 2, 2, 2, 1])); //{pos: [1], peaks: [2]}
console.log(pickPeaks([3, 2, 2, 2, 1])); //{pos: [], peaks: []}
console.log(pickPeaks([1, 2, 2, 2, 4])); //{pos: [], peaks: []}
console.log(pickPeaks([2, 1, 3, 1, 2, 2, 2, 2])); //{ pos: [ 2 ], peaks: [ 3 ] }
