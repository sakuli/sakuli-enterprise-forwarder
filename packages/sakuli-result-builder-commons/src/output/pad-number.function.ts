export const padNumberWithZeros = (input: number, length: number): string => {
    return Array(Math.max(length - String(input).length + 1, 0)).join('0') + input;
};