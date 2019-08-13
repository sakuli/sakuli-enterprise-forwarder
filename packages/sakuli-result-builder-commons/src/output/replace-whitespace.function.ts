export const replaceWhitespaces = (inputString: string, replacement: string): string => {
    return inputString.split(" ").join(replacement.trim());
};
