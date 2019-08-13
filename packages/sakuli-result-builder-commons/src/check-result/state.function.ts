export function getShortState(testEntityState: number) {
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
}

export function getStateName(testEntityState: number) {
    const OK = 'OK';
    const WARNING = 'WARNING';
    const CRITICAL = 'CRITICAL';
    const UNKNOWN = 'UNKNOWN';
    return (<Record<number, string>>({
        0: OK,
        1: WARNING,
        2: CRITICAL,
        3: UNKNOWN,
        4: CRITICAL,
    }))[testEntityState] || UNKNOWN;
}
