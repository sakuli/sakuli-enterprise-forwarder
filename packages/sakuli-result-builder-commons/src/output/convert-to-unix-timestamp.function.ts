import {Maybe, ifPresent} from "@sakuli/commons";

export const convertToUnixTimestamp = (date: Maybe<Date>) => {
    return ifPresent(date,
        d => (d.getTime() / 1000).toFixed(3).toString(),
        () => '-1'
    ).trim();
};
