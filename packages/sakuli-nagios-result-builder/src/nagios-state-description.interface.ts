export type NagiosStateObject = {
    errorCode: number;
    description: string;
}

export const NagiosState = {
    OK: {errorCode: 0, description: "ok"},
    WARNING_IN_STEP: {errorCode: 1, description: "warning in step"},
    WARNING_IN_CASE: {errorCode: 2, description: "warning in case"},
    WARNING: {errorCode: 3, description: "warning"},
    CRITICAL_IN_STEP: {errorCode: 7, description: "critical in step"},
    CRITICAL_IN_CASE: {errorCode: 4, description: "critical in case"},
    CRITICAL: {errorCode: 5, description: "critical"},
    ERRORS: {errorCode: 6, description: "EXCEPTION"},
    RUNNING: {errorCode: -1, description: "suite still running"}
};
