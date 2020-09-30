function sqInRect(lng, wdth) {
    if (lng === wdth) {
        return null;
    }

    let result = [];

    let arr = [lng, wdth]
        .sort();

    while (true) {
        for (let i = 0; i < Math.floor(arr[0] / arr[1]); i++) {
            result.push(arr[1])
        }
        if (arr[0] % arr[1] === 0) {
            return result;
        }
        arr = [arr[1], arr[0] % arr[1]];
    }
}