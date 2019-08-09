import {
    TestCaseContext,
    TestContextEntity,
    TestContextEntityStates,
    TestStepContext,
    TestSuiteContext
} from "@sakuli/core";
import {oneLine} from "common-tags";
import {renderCaseCritical, renderCaseWarning, renderLastRun, renderStepWarnings, renderSuiteErrors} from "../render";
import {
    getNagiosCaseState,
    getNagiosSuiteState,
    getShortState,
    NagiosState,
    NagiosStateObject
} from "../../check-result";
import {abbreviate} from "../../output";

export const renderShortSuiteSummary = (testContextEntity: TestSuiteContext): string => {
    const nagiosState = getNagiosSuiteState(testContextEntity);
    return oneLine(`
        ${getShortState(testContextEntity.state)} Sakuli suite "${testContextEntity.id}"
        ${(testContextEntity.state === TestContextEntityStates.ERROR) ? renderError(testContextEntity) : renderSuccess(testContextEntity, nagiosState)}
    `)
};

const renderError = (testDataEntity: TestSuiteContext): string => {
    return oneLine(`
        (${testDataEntity.duration.toFixed(2)}s)
        ${getNagiosSuiteState(testDataEntity).description}:
        ${abbreviate(renderSuiteErrors(testDataEntity), 200, true)}
    `);
};

const renderSuccess = (testDataEntity: TestSuiteContext, nagiosState: NagiosStateObject) => {
    return `${nagiosState.description}${renderCaseState(testDataEntity, nagiosState)}`;
};

const renderCaseState = (testSuite: TestSuiteContext, nagiosState: NagiosStateObject): string => {
    let state = "";
    if (nagiosState.errorCode === NagiosState.OK.errorCode) {
        state = ` (${testSuite.duration.toFixed(2)}s)`
    } else if (nagiosState.errorCode === NagiosState.WARNING.errorCode) {
        state = ` (${testSuite.duration.toFixed(2)}s/warn at ${testSuite.warningTime}s)`;
    } else if (nagiosState.errorCode === NagiosState.CRITICAL.errorCode) {
        state = ` (${testSuite.duration.toFixed(2)}s/crit at ${testSuite.criticalTime}s)`;
    } else if (nagiosState.errorCode === NagiosState.WARNING_IN_STEP.errorCode) {
        state = renderWarningInStep(testSuite.getChildren());
    } else if (nagiosState.errorCode === NagiosState.WARNING_IN_CASE.errorCode || nagiosState.errorCode === NagiosState.CRITICAL_IN_CASE.errorCode) {
        state = renderWarningOrCriticalInCase(testSuite.getChildren() as TestCaseContext[]);
    }

    return `${state}. (Last suite run: ${renderLastRun(testSuite)})`;
};

const renderWarningOrCriticalInCase = (testCases: TestCaseContext[]): string => {
    const caseResults = [];
    for (const testCase of testCases) {
        caseResults.push(renderCaseWarning(testCase));
        caseResults.push(renderCaseCritical(testCase));
    }
    return caseResults.join("");
};

const renderWarningInStep = (testCases: TestContextEntity[]): string => {
    let stepWarnings = [];
    for (const testCase of testCases) {
        const nagiosCaseState = getNagiosCaseState(testCase);
        if (nagiosCaseState.errorCode === NagiosState.WARNING_IN_STEP.errorCode) {
            stepWarnings.push(
                renderStepWarnings(testCase.getChildren() as TestStepContext[], true)
            );
        }
    }
    return stepWarnings.join("");
};
