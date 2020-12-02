// https://www.codewars.com/kata/5235c913397cbf2508000048/train/javascript

const addition = "+";
const subtraction = "-";
const multiply = "*";
const division = "/";
const openBracket = "(";
const closeBracket = ")";

const Calculator = function () {
    this.evaluate = (value: string): number => {
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
    };

    this.calculate = (parts: string[]): string | string[] => {
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
    };

    this.findBracketGroupToCalculate = (
        startingPosition: number,
        parts: string[]
    ): { openBracketPosition: number; closeBracketPosition: number } => {
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
    };

    this.calculateWithoutBrackets = (parts: string[]): string => {
        let result: string | string[] = parts;

        let multiplyPosition: number;
        let divisionPosition: number;

        let intermediateResult: string;

        while (typeof result !== "string") {
            // handle multiply
            multiplyPosition = result.indexOf(multiply);
            if (multiplyPosition !== -1) {
                intermediateResult = (
                    +result[multiplyPosition - 1] *
                    +result[multiplyPosition + 1]
                ).toString();

                if (result.length === 3) {
                    // no calculations left except current
                    result = intermediateResult;
                } else {
                    result = [
                        ...result.slice(0, multiplyPosition - 1),
                        intermediateResult,
                        ...result.slice(multiplyPosition + 2),
                    ];
                }
                continue;
            }

            // handle division
            divisionPosition = result.indexOf(division);
            if (divisionPosition !== -1) {
                // TODO: handle division by 0
                intermediateResult = (
                    +result[divisionPosition - 1] /
                    +result[divisionPosition + 1]
                ).toString();

                if (result.length === 3) {
                    // no calculations left except current
                    result = intermediateResult;
                } else {
                    result = [
                        ...result.slice(0, divisionPosition - 1),
                        intermediateResult,
                        ...result.slice(divisionPosition + 2),
                    ];
                }
                continue;
            }

            break;
        }

        // handle addition and subtraction
        while (typeof result !== "string") {
            if (result[1] === addition) {
                intermediateResult = (+result[0] + +result[2]).toString();

                if (result.length === 3) {
                    // no calculations left except current
                    result = intermediateResult;
                } else {
                    result = [intermediateResult, ...result.slice(3)];
                }
                continue;
            }

            if (result[1] === subtraction) {
                intermediateResult = (+result[0] - +result[2]).toString();

                if (result.length === 3) {
                    // no calculations left except current
                    result = intermediateResult;
                } else {
                    result = [intermediateResult, ...result.slice(3)];
                }
                continue;
            }
        }

        return result;
    };
};

var calculate = new Calculator();
let arguments = [
    ["127", 127],
    ["2 + 3", 5],
    ["2 - 3 - 4", -5],
    ["10 * 5 / 2", 25],
    ["2 / 2 + 3 * 4 - 6", 7],
    ["( 1 + 2 * 3 ) - 5 / 5", 6],
    ["( 12 + ( 2 * 3 ) - 1 ) + 4", 21],
    [
        "( 12 + ( 2 * 3 ) - 1 ) + 4 * ( 2 - 1 * ( 3 - 2 ) ) / ( 4 * 4 / 4 ) + 2",
        20,
    ],
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
