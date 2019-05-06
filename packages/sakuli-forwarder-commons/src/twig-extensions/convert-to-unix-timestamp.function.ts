import { TwingFunction } from "twing";

export const convertToUnixTimestamp = new TwingFunction('convertToUnixTimestamp', (date: Date | null) => {
    return date == null
        ? '-1'
        : `${(date.getTime() / 1000).toFixed(3)}`;
})