import renderCss from "./detailed-summary-css.function";
import {TestStepContext} from "@sakuli/core";
import {oneLine, oneLineTrim} from "common-tags";
import {extractScreenshot, renderDetailedTestStepState, renderLastRun} from "../render";
import {getNagiosStepState, getShortState, getStateName, NagiosStateObject} from "../../check-result";

export function renderDetailedStepSummary(testStep: TestStepContext, caseId: string) {
    const nagiosState = getNagiosStepState(testStep);
    return oneLineTrim(`
${renderCss()}
<table style="border-collapse: collapse;">
<tr valign="top">
    <td class="service${getStateName(testStep.state)}">
    ${renderStepTableData(testStep, nagiosState, caseId)}
    </td>
</tr>
</table>
`);
}

const renderStepTableData = (testDataEntity: TestStepContext, nagiosState: NagiosStateObject, caseId: string) => {
    return oneLine(`
        ${getShortState(testDataEntity.state)} Step "${testDataEntity.id}" in case "${caseId}"
        ${nagiosState.description}
        ${renderDetailedTestStepState(testDataEntity)}
        (Last suite run: ${renderLastRun(testDataEntity)})
        ${extractScreenshot(testDataEntity)}
    `);
};
