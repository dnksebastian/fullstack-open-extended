export const checkNumber = (n: unknown): number => {
    const number = Number(n);
    
    if(isNaN(number)) {
        throw new Error(`Entered value ${n} is not a number`);
    }

    return number;
};