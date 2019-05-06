import { TwingFunction } from "twing";
import { number } from "prop-types";

export const getOutputState = new TwingFunction('getOutputState', (testEntityState: number) => {
    const OK = '[OK]';
    const WARNING = '[WARN]';
    const CRITICAL = '[CRIT]';
    const UNKNOWN = '[UNKN]';
    return (<Record<number, string>>({
        0: OK,
        1: WARNING,
        2: CRITICAL,
        3: UNKNOWN,
        4: CRITICAL
    }))[testEntityState] || UNKNOWN;
})