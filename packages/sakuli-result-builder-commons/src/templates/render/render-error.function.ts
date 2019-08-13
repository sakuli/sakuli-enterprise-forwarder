import {TestCaseContext, TestContextEntity, TestContextEntityStates, TestSuiteContext} from "@sakuli/core";
import {ifPresent} from "@sakuli/commons";
import {oneLineTrim} from "common-tags";

export const renderError = (testDataEntity: TestContextEntity) => {
    return ifPresent(testDataEntity.error, error => error.message, () => "");
};

export const renderSuiteErrors = (testSuite: TestSuiteContext): string => {
    if (testSuite.kind !== 'suite') {
        return "";
    }
    const suiteError = renderError(testSuite);
    const caseErrors = testSuite
        .getChildren()
        .filter(tc => tc.kind === 'case')
        .map(tc => {
            const caseError = renderCaseErrors(tc as TestCaseContext);
            const dash = (suiteError.length && caseError.length) ? "--" : "";
            const error = (caseError.length) ? `CASE "${tc.id}": ${caseError}` : "";
            return [dash, error].join(" ");
        });
    return [suiteError, ...caseErrors].join(" ").trim();
};

export const renderCaseErrors = (testCase: TestCaseContext): string => {
    if (testCase.kind !== 'case') {
        return "";
    }
    const caseError = renderError(testCase);
    const stepErrors = testCase
        .getChildren()
        .filter(ts => ts.kind === 'step')
        .map(ts => {
            const stepError = renderError(ts);
            const dash = (caseError.length && stepError.length) ? "-" : "";
            const error = (stepError.length) ? `STEP "${ts.id}": ${stepError}` : "";
            return [dash, error].join(" ");
        });
    return [caseError, ...stepErrors].join(" ").trim();
};

export const renderDetailedCaseError = (testDataEntity: TestCaseContext, nagiosState: string): string => {
    return (testDataEntity.state === TestContextEntityStates.ERROR) ?
        oneLineTrim(`
            (${testDataEntity.duration}s)
            ${nagiosState}
            ${renderCaseErrors(testDataEntity as TestCaseContext)}
    `) : "";
};
