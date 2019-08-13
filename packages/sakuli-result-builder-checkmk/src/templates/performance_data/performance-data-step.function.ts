import {oneLine} from "common-tags";
import {TestStepContext} from "@sakuli/core";
import {getEntityId, getOutputDuration} from "@sakuli/result-builder-commons";
import {ifPresent, Maybe} from "@sakuli/commons";

export interface PerformanceDataStepParameters {
    testStepIdx: Maybe<string>
    testCaseIdx?: Maybe<string>
    suiteId?: Maybe<string>
}

export const performanceDataStep = (testStep: TestStepContext, params: PerformanceDataStepParameters = {testStepIdx: "001"}): string => {
    const {testStepIdx, testCaseIdx, suiteId} = params;
    return oneLine(`
        ${ifPresent(testCaseIdx, (caseIdx: string) => `s_${caseIdx}_${testStepIdx}_${getEntityId(testStep)}=${getOutputDuration(testStep)};`, () => `s_${testStepIdx}_${getEntityId(testStep)}=${getOutputDuration(testStep)};`)}${(testStep.warningTime > 0) ? testStep.warningTime : ""};;;
    `).split(" ").join("|");
};