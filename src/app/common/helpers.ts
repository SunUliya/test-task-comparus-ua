export const getArrayWithTwinValues = (value: any, size: number): any[] => {
    const arr = [];
    while(arr.length < size) {
        arr.push(value);
    }
    return arr;
}

export const getRandomNumber = (max: number): number => {
    return Math.floor(Math.random() * max);
}

export const getUniqRandomNumber = (arr: number[], amount: number): number => {
    let randomNumber: number;
    do {
        randomNumber = getRandomNumber(amount);
    } while (arr.includes(randomNumber));

    return randomNumber;
}