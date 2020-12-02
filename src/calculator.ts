// https://www.codewars.com/kata/5235c913397cbf2508000048/train/javascript

const plus = "+";
const minus = "-";
const multiply = "*";
const division = "/";
const openBracket = "(";
const closeBracket = ")";

class Calculator {
    evaluate(value: string): number {
        if (!value) return 0;

        if (value.indexOf(" ") === -1) {
            return +value;
        }

        let parts: string[] = value.split(" ");

        // calculate values in brackets
        // calculate values by multiplication and division priority
        // calculate values by adding or subtraction

        let result = this.calculate(parts);

        while (typeof result !== "string") {
            result = this.calculate(result);
        }

        return +result;
    }

    calculate(parts: string[]): string | string[] {
        let openBracketIndex = parts.indexOf(openBracket);
        let bracketGroup: {
            openBracketPosition: number;
            closeBracketPosition: number;
        };
        let groupResult: string;

        if (openBracketIndex !== -1) {
            // we have brackets

            // find first bracket group without bracket groups inside and calculate its result
            bracketGroup = this.findBracketGroupToCalculate(
                openBracketIndex,
                parts
            );
            groupResult = this.calculateWithoutBrackets(
                parts.slice(
                    bracketGroup.openBracketPosition + 1,
                    bracketGroup.closeBracketPosition
                )
            );
            parts = [
                ...parts.slice(0, bracketGroup.openBracketPosition),
                groupResult,
                ...parts.slice(bracketGroup.closeBracketPosition + 1),
            ];
            return parts;
        } else {
            // we do not have brackets
            return this.calculateWithoutBrackets(parts);
        }
    }

    findBracketGroupToCalculate(
        startingPosition: number,
        parts: string[]
    ): { openBracketPosition: number; closeBracketPosition: number } {
        let openBracketPosition = startingPosition;
        let closeBracketPosition;

        for (
            let symbolIndex = startingPosition;
            symbolIndex < parts.length;
            symbolIndex++
        ) {
            if (parts[symbolIndex] === openBracket) {
                openBracketPosition = symbolIndex;
            }

            if (parts[symbolIndex] === closeBracket) {
                closeBracketPosition = symbolIndex;
                // on first close bracket quit cycle - we found bracket group
                break;
            }
        }

        return { openBracketPosition, closeBracketPosition };
    }

    calculateWithoutBrackets(parts: string[]): string {
        // TODO: implement this method
        return parts[0];
    }
}

var calculate = new Calculator();
let arguments = [
    ["127", 127],
    ["2 + 3", 5],
    ["2 - 3 - 4", -5],
    ["10 * 5 / 2", 25],
    ["2 / 2 + 3 * 4 - 6", 7],
    ["( 1 + 2 * 3 ) - 5 / 5", 6],
    ["( 12 + ( 2 * 3 ) - 1 ) + 4", 21],
];
arguments.forEach(([argument, expected]: [string, number]) => {
    console.log(argument, calculate.evaluate(argument), expected);
});

// console.log(
//     calculate.findBracketGroupToCalculate(0, ["(", "12", "+", "2", ")"])
// );
// console.log(
//     calculate.findBracketGroupToCalculate(0, [
//         "(",
//         "12",
//         "+",
//         "(",
//         "2",
//         "*",
//         "5",
//         ")",
//         "-",
//         "1",
//         ")",
//     ])
// );
