// https://www.codewars.com/kata/5235c913397cbf2508000048/train/javascript

class Calculator {
    evaluate(value: string): string {
        if (!value) return value;

        if (value.indexOf(" ") === -1) {
            return value;
        }

        return eval(value);
    }
}

var calculate = new Calculator();
let arguments = [
    ["127", 127],
    ["2 + 3", 5],
    ["2 - 3 - 4", -5],
    ["10 * 5 / 2", 25],
    ["2 / 2 + 3 * 4 - 6", 7],
    ["(1 + 2 * 3) - 5 / 5", 6],
];
arguments.forEach(([argument, expected]: [string, number]) => {
    console.log(argument, calculate.evaluate(argument), expected);
});
