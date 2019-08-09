import renderCss from "./detailed-summary-css.function";
import {TestCaseContext, TestContextEntityStates, TestStepContext} from "@sakuli/core";
import {oneLine, oneLineTrim} from "common-tags";
import {extractScreenshot, renderDetailedTestCaseState, renderLastRun} from "../render";
import {renderDetailedCaseError, renderError as renderException} from "../render/render-error.function";
import {
    getNagiosCaseState,
    getNagiosStepState,
    getShortState,
    getStateName,
    NagiosStateObject
} from "../../check-result";

export function renderDetailedCaseSummary(testContextEntity: TestCaseContext, suiteId: string) {
    const nagiosState = getNagiosCaseState(testContextEntity);
    return oneLineTrim(`
${renderCss()}
<table style="border-collapse: collapse;">
${renderCaseRow(testContextEntity, nagiosState, suiteId)}
${renderStepRows(testContextEntity)}
</table>`);
}

const renderCaseRow = (testContextEntity: TestCaseContext, nagiosState: NagiosStateObject, suiteId: string): string => {
    return oneLineTrim(`
<tr valign="top">
    <td class="service${getStateName(testContextEntity.state)}">
    ${renderCaseTableData(testContextEntity, nagiosState, suiteId)}
    </td>
</tr>
    `)
};

const renderCaseTableData = (testCase: TestCaseContext, nagiosState: NagiosStateObject, suiteId: string) => {
    return oneLine(`
        ${getShortState(testCase.state)} Case "${testCase.id}" of Sakuli suite "${suiteId}"
        ${(testCase.state === TestContextEntityStates.ERROR) ? renderError(testCase) : renderSuccess(testCase, nagiosState)}
        .
        (Last suite run: ${renderLastRun(testCase)})
        ${extractScreenshot(testCase)}
    `);
};

const renderError = (testCase: TestCaseContext): string => {
    return oneLine(`
        (${testCase.duration.toFixed(2)}s)
        ${getNagiosCaseState(testCase).description}:
        .
    `);
};

const renderSuccess = (testCase: TestCaseContext, nagiosState: NagiosStateObject): string => {
    return oneLine(`
        ${nagiosState.description}
        ${renderDetailedTestCaseState(testCase)}
        ${renderDetailedCaseError(testCase, nagiosState.description)}
    `);
};

const renderStepRows = (testCase: TestCaseContext): string => {
    const stepResults = [];
    for (const testStep of testCase.getChildren()) {
        const nagiosState = getNagiosStepState(testStep);
        const newResult = oneLineTrim(`
            <tr valign="top">
                <td class="service${getStateName(testStep.state)}">
                    ${getShortState(testStep.state)} step "${testStep.id}" 
                    ${renderStepState(testStep as TestStepContext, nagiosState)}
                </td>
            </tr>
        `);
        stepResults.push(newResult);
    }
    return stepResults.join("");
};

const renderStepState = (testStep: TestStepContext, nagiosState: NagiosStateObject): string => {
    if (testStep.state === TestContextEntityStates.OK) {
        return `ran in ${testStep.duration.toFixed(2)}s - ${nagiosState.description}`
    } else if (testStep.state === TestContextEntityStates.WARNING) {
        return `over runtime (${testStep.duration.toFixed(2)}s/warn at ${testStep.warningTime}s)`
    } else if (testStep.state === TestContextEntityStates.CRITICAL) {
        return `over runtime (${testStep.duration.toFixed(2)}s/crit at ${testStep.criticalTime}s)`
    } else if (testStep.state === TestContextEntityStates.ERROR) {
        return `EXCEPTION: ${renderException(testStep)}${extractScreenshot(testStep)}`;
    } else {
        return "";
    }
};