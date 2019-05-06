import { TwingFunction } from "twing";

export const empty = new TwingFunction('empty', (value: {length: number} | null | undefined) => {
    return value == null || value.length <= 0;
})