import {TestCaseContext, TestContextEntityStates} from "@sakuli/core";

export const renderCaseWarning = (testCase: TestCaseContext) => {
    return (testCase.ownState === TestContextEntityStates.WARNING)
        ? `, case "${testCase.id}" over runtime (${testCase.duration}s/warn at ${testCase.warningTime}s)`
        : ""
            .trim();
};
