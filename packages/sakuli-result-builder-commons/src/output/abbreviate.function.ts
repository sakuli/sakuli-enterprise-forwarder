export const abbreviate = (input: string | null, maxLength: number, removeWhitespaces: boolean = false) => {
    if (input == null) {
        return null;
    } else {
        const trimmed = removeWhitespaces ? input.trimLeft() : input;
        return trimmed.length <= maxLength
            ? trimmed
            : trimmed.substring(0, maxLength - 3).concat('...');
    }
};