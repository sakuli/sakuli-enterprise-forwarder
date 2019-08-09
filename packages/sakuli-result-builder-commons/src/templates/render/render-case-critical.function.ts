import {TestCaseContext, TestContextEntityStates} from "@sakuli/core";

export const renderCaseCritical = (testCase: TestCaseContext) => {
    return (testCase.state === TestContextEntityStates.CRITICAL)
        ? `, case "${testCase.id}" over runtime (${testCase.duration.toFixed(2)}s/crit at ${testCase.criticalTime}s)`
        : ""
            .trim();
};
