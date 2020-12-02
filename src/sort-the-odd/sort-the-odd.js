function sortArray(arr) {
    let odd = arr
        .filter(v => v % 2)
        .sort((x, y) => x >= y);
    return arr
        .slice()
        .reverse()
        .map(v => (v % 2 === 0) ? v : odd.pop())
        .reverse();
}

console.log(JSON.stringify(sortArray([95, 72, 73, 56, 84, 61, 78, 49])));