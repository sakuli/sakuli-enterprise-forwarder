import renderCss from "./detailed-summary-css.function";
import {TestStepContext} from "@sakuli/core";
import {oneLine, oneLineTrim} from "common-tags";
import {getShortState, getStateName} from "../../state.function";
import {getNagiosStepState} from "../../get-nagios-state-description.function";
import {NagiosStateObject} from "../../nagios-state-description.interface";
import {renderDetailedTestStepState} from "../render/render-detailed-step-state.function";
import {renderLastRun} from "../render/render-last-run.function";
import {extractScreenshot} from "../render/extract-screenshot.function";

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
