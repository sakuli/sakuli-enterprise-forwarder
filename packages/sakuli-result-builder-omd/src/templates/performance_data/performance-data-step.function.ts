import {oneLine} from "common-tags";
import {TestStepContext} from "@sakuli/core";
import {performanceMetaData} from "./performance-meta-data.function";
import {getOutputDuration} from "@sakuli/result-builder-commons";
import {ifPresent, Maybe} from "@sakuli/commons";

export interface PerformanceDataStepParameters {
    testStepIdx: Maybe<string>
    testCaseIdx?: Maybe<string>
    suiteId?: Maybe<string>
}

export const performanceDataStep = (testStep: TestStepContext, params: PerformanceDataStepParameters = {testStepIdx: "001"}): string => {
    const {testStepIdx, testCaseIdx, suiteId} = params;
    return oneLine(`
        ${ifPresent(suiteId, (suiteId: string) => performanceMetaData(suiteId, "step"), () => "")}
        ${ifPresent(testCaseIdx, (caseIdx: string) => `s_${caseIdx}_${testStepIdx}_${testStep.id}=${getOutputDuration(testStep)};`, () => `s_${testStepIdx}_${testStep.id}=${getOutputDuration(testStep)};`)}${(testStep.warningTime > 0) ? testStep.warningTime : ""};;;
    `)
};