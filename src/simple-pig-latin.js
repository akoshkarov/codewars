function pigIt(str) {
    let replacers = str
        .split(/[^a-zA-Z]+/g)
        .filter(Boolean)
        .reduce(
            (res, word, index) => [
                ...res,
                {
                    word,
                    replacement: `{%${index}}`,
                    final: [...word.slice(1), word[0], ..."ay"].join("")
                }
            ],
            []
        );
    let temp = str;
    for (let i = 0; i < replacers.length; i++) {
        let { word, replacement } = replacers[i];
        temp = temp.replace(word, replacement);
    }
    for (let i = 0; i < replacers.length; i++) {
        let { replacement, final } = replacers[i];
        temp = temp.replace(replacement, final);
    }
    return temp;
}

function pigItConsole(str) {
    console.log(pigIt(str));
}
pigItConsole("Pig latin is cool"); // igPay atinlay siay oolcay
pigItConsole("Hello world !"); // elloHay orldway !
pigItConsole("This is my string"); // hisTay siay ymay tringsay
pigItConsole("123dfasf, asdfsdf!!"); //
