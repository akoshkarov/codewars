function dirReduc(arr) {
    let length, skip, tempArr;
    do {
        length = arr.length;
        skip = false;
        tempArr = [];

        arr.forEach((dir, index, array) => {
            if (skip) {
                skip = false;
                return;
            }
            if (array.indexOf(getOpposite(dir), index) === index + 1) {
                skip = true;
                return;
            }
            tempArr.push(dir);
        });

        arr = tempArr;
    } while (length > arr.length);

    return arr;
}

function getOpposite(dir) {
    switch (dir) {
        case 'NORTH':
            return 'SOUTH';
        case 'SOUTH':
            return 'NORTH';
        case 'WEST':
            return 'EAST';
        case 'EAST':
            return 'WEST';
    }
}