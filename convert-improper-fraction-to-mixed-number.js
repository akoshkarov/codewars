function getMixedNum2(fraction) {
    let numbers = fraction.split("/").map(value => parseInt(value));
    return (
        Math.floor(numbers[0] / numbers[1]) +
        " " +
        (numbers[0] % numbers[1]) +
        "/" +
        numbers[1]
    );
}

// getMixedNum("18/11"); // Should return '1 7/11'
// getMixedNum("13/5"); // Should return '2 3/5'
// getMixedNum("75/10"); // Should return '7 5/10'
