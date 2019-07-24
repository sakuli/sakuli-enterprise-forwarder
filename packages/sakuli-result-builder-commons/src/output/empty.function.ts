export const empty = (value: { length: number } | null | undefined) => {
    return value == null || value.length <= 0;
};