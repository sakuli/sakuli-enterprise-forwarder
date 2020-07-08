import {oneLine} from "common-tags";
import {TestCaseContext, TestContextEntityStates, TestStepContext} from "@sakuli/core";
import {renderCaseErrors, renderLastRun, renderStepWarnings} from "../render";
import {getNagiosCaseState, NagiosState, NagiosStateObject} from "../../check-result";
import {abbreviate} from "../../output";

export function renderShortCaseSummary(testCase: TestCaseContext, suiteId: string) {
    const nagiosState = getNagiosCaseState(testCase);
    return (testCase.kind !== "case") ? "" : oneLine(`
    Case "${testCase.id}" of Sakuli suite "${suiteId}"
    ${(testCase.state === TestContextEntityStates.ERROR) ? renderError(testCase, nagiosState) : renderSuccess(testCase, nagiosState)}
    `);
}

const renderError = (testCase: TestCaseContext, nagiosState: NagiosStateObject): string => {
    return `(${testCase.duration.toFixed(2)}s) ${nagiosState.description}: ${abbreviate(renderCaseErrors(testCase), 200, true)}`;
};

const renderSuccess = (testCase: TestCaseContext, nagiosState: NagiosStateObject) => {
    return oneLine(`
        ${nagiosState.description}${renderCaseState(testCase, nagiosState)}.
        (Last suite run: ${renderLastRun(testCase)})\n
    `);
};

const renderCaseState = (testCase: TestCaseContext, nagiosState: NagiosStateObject): string => {
    const stepsWithWarning = testCase
        .getChildren()
        .filter(child => child.kind === "step")
        .filter(child => child.state === TestContextEntityStates.WARNING) as TestStepContext[];

    if (nagiosState.errorCode === NagiosState.OK.errorCode) {
        return ` (${testCase.duration.toFixed(2)}s)`
    } else if (nagiosState.errorCode === NagiosState.WARNING.errorCode) {
        return ` case "${testCase.id}" over runtime (${testCase.duration.toFixed(2)}s/warn at ${testCase.warningTime}s)`
    } else if (nagiosState.errorCode === NagiosState.CRITICAL.errorCode) {
        return ` case "${testCase.id}" over runtime (${testCase.duration.toFixed(2)}s/crit at ${testCase.criticalTime}s)`
    } else if (nagiosState.errorCode === NagiosState.WARNING_IN_STEP.errorCode) {
        return renderStepWarnings(stepsWithWarning, true);
    }
    return "";
};
