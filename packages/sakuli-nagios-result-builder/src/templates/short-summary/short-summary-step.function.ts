import {TestContextEntityStates, TestStepContext} from "@sakuli/core";
import {oneLine} from "common-tags";
import {getShortState} from "../../state.function";
import {getNagiosStepState} from "../../get-nagios-state-description.function";
import {NagiosStateObject} from "../../nagios-state-description.interface";
import {ifPresent} from "@sakuli/commons";
import {abbreviate} from "@sakuli/result-builder-commons/dist";
import {renderLastRun} from "../render/render-last-run.function";

export const renderShortStepSummary = (testContextEntity: TestStepContext, caseId: string, suiteId: string): string => {
    const nagiosState = getNagiosStepState(testContextEntity);
    return (testContextEntity.kind !== "step") ? "" : oneLine(`
    ${getShortState(testContextEntity.state)} Step "${testContextEntity.id}" in case "${caseId}" of Sakuli suite "${suiteId}"
    ${(testContextEntity.error ? renderError(testContextEntity, nagiosState) : renderSuccess(testContextEntity, nagiosState))}
    `);
};

const renderError = (testDataEntity: TestStepContext, nagiosState: NagiosStateObject): string => {
    return ifPresent(testDataEntity.error,
        (error) => `(${testDataEntity.duration.toFixed(2)}s) ${nagiosState.description}: ${abbreviate(error.message, 200, true)}`,
        () => "")
};

const renderSuccess = (testDataEntity: TestStepContext, nagiosState: NagiosStateObject) => {
    return `${nagiosState.description} ${renderCaseState(testDataEntity)}`;
};

const renderCaseState = (testStep: TestStepContext): string => {
    let state = "";
    if (testStep.state === TestContextEntityStates.OK) {
        state = ` (${testStep.duration.toFixed(2)}s)`
    } else if (testStep.state === TestContextEntityStates.WARNING) {
        state = ` step "${testStep.id}" over runtime (${testStep.duration.toFixed(2)}s/warn at ${testStep.warningTime}s)`
    } else if (testStep.state === TestContextEntityStates.CRITICAL) {
        state = ` step "${testStep.id}" over runtime (${testStep.duration.toFixed(2)}s/crit at ${testStep.criticalTime}s)`
    }

    return oneLine(`
        ${state}. (Last test step run: ${renderLastRun(testStep)})
    `);
};
