import { TwingFunction } from "twing";

export const isBlank = new TwingFunction('isBlank', (value: string) => {
    return value.trim().length === 0;
})