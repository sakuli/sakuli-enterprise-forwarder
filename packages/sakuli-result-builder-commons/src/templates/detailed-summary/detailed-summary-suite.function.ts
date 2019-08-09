import renderCss from "./detailed-summary-css.function";
import {TestCaseContext, TestContextEntityStates, TestStepContext, TestSuiteContext} from "@sakuli/core";
import {oneLine, oneLineTrim} from "common-tags";
import {
    extractScreenshot,
    renderCaseCritical, renderCaseErrors,
    renderCaseWarning,
    renderLastRun,
    renderStepWarnings,
    renderSuiteErrors
} from "../render";
import {
    getNagiosCaseState,
    getNagiosSuiteState,
    getShortState,
    getStateName,
    NagiosState,
    NagiosStateObject
} from "../../check-result";
import {exceptionMessage} from "../render/error-messages.function";

export function renderDetailedSuiteSummary(testContextEntity: TestSuiteContext) {
    const nagiosState = getNagiosSuiteState(testContextEntity);
    return oneLineTrim(`
${renderCss()}
<table style="border-collapse: collapse;">
    ${renderSuite(testContextEntity, nagiosState)}
    ${renderCasesInSuite(testContextEntity.getChildren() as TestCaseContext[])}
</table>
`);
}

const renderSuite = (testContextEntity: TestSuiteContext, nagiosState: NagiosStateObject): string => {
    return oneLineTrim(`
    <tr valign="top">
        <td class="service${getStateName(testContextEntity.state)}">
            ${renderSuiteTableData(testContextEntity, nagiosState)}
        </td>
    </tr>
    `)
};

const renderSuiteTableData = (testContextEntity: TestSuiteContext, nagiosState: NagiosStateObject): string => {
    return oneLine(`
        ${getShortState(testContextEntity.state)} Sakuli suite "${testContextEntity.id}"
        ${(testContextEntity.state === TestContextEntityStates.ERROR) ? renderError(testContextEntity) : renderSuccess(testContextEntity, nagiosState)}
    `);
};

const renderError = (testDataEntity: TestSuiteContext): string => {
    if (testDataEntity.state === TestContextEntityStates.ERROR) {
        return oneLine(`
            (${testDataEntity.duration.toFixed(2)}s)
            ${getNagiosSuiteState(testDataEntity).description}:
            ${renderSuiteErrors(testDataEntity)}.
            .
            (Last suite run: ${renderLastRun(testDataEntity)})
    `);
    }
    return "";
};

const renderSuccess = (testDataEntity: TestSuiteContext, nagiosState: NagiosStateObject) => {
    return `${nagiosState.description}${renderSuiteState(testDataEntity, nagiosState)}`;
};

const renderSuiteState = (testSuite: TestSuiteContext, nagiosState: NagiosStateObject): string => {
    let state = "";
    if (nagiosState.errorCode === NagiosState.OK.errorCode) {
        state = ` (${testSuite.duration.toFixed(2)}s)`
    } else if (nagiosState.errorCode === NagiosState.WARNING.errorCode) {
        state = ` (${testSuite.duration.toFixed(2)}s/warn at ${testSuite.warningTime}s)`;
    } else if (nagiosState.errorCode === NagiosState.CRITICAL.errorCode) {
        state = ` (${testSuite.duration.toFixed(2)}s/crit at ${testSuite.criticalTime}s)`;
    } else if (nagiosState.errorCode === NagiosState.WARNING_IN_STEP.errorCode) {
        state = renderWarningInStep(testSuite.getChildren() as TestCaseContext[]);
    } else if (nagiosState.errorCode === NagiosState.WARNING_IN_CASE.errorCode) {
        state = renderWarningOrCriticalInCase(testSuite.getChildren() as TestCaseContext[]);
    } else if (nagiosState.errorCode === NagiosState.CRITICAL_IN_CASE.errorCode) {
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

const renderWarningInStep = (testCases: TestCaseContext[]): string => {
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

const renderCasesInSuite = (testCases: TestCaseContext[]): string => {
    const renderCase = (testCase: TestCaseContext): string => {
        return oneLineTrim(`
        <tr valign="top">
            <td class="service${getStateName(testCase.state)}">
                ${renderTestCaseTableData(testCase)}
            </td>
        </tr>
    `)
    };
    return testCases
        .map(renderCase)
        .join("");
};

const renderTestCaseTableData = (testCase: TestCaseContext): string => {
    return oneLine(`
        ${getShortState(testCase.state)} case "${testCase.id}"
        ${renderTestCaseState(testCase)}
    `);
};

const renderTestCaseState = (testCase: TestCaseContext): string => {
    const nagiosState = getNagiosCaseState(testCase);
    let state = "";
    if (testCase.state === TestContextEntityStates.OK) {
        state = `ran in ${testCase.duration.toFixed(2)}s - ${nagiosState.description}`
    } else if (testCase.state === TestContextEntityStates.WARNING) {
        state = `over runtime (${testCase.duration.toFixed(2)}s/warn at ${testCase.warningTime}s)${renderStepInfo(testCase.getChildren() as TestStepContext[])} `;
    } else if (testCase.state === TestContextEntityStates.CRITICAL && !testCase.error) {
        state = `over runtime (${testCase.duration.toFixed(2)}s/crit at ${testCase.criticalTime}s)`
    } else if (testCase.state === TestContextEntityStates.ERROR) {
        const stepScreenShots = testCase
            .getChildren()
            .map(extractScreenshot)
            .join("");
        state = `EXCEPTION: ${renderCaseErrors(testCase)}${extractScreenshot(testCase)}${stepScreenShots}`
    }
    return state;
};

const renderStepInfo = (testSteps: TestStepContext[]): string => {
    return testSteps.map(testStep => {
        if (testStep.error) {
            return `, step "${testStep.id}" EXCEPTION: ${exceptionMessage(testStep)}`
        } else if (testStep.state === TestContextEntityStates.WARNING) {
            return `, step "${testStep.id}" over runtime (${testStep.duration.toFixed(2)}s/warn at ${testStep.warningTime}s)`
        }
        return "";
    }).join("");
};
