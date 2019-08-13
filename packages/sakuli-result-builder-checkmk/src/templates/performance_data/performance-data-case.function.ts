import {TestCaseContext, TestStepContext} from "@sakuli/core";
import {oneLine} from "common-tags";
import {getEntityId, getNagiosResultState, getOutputDuration, padNumberWithZeros} from "@sakuli/result-builder-commons";
import {performanceDataStep} from "./performance-data-step.function";
import {isPresent, Maybe} from "@sakuli/commons";

export interface PerformanceDataCaseParameters {
    testCaseIdx: Maybe<string>
    suiteId?: Maybe<string>
}

export const performanceDataCase = (testCase: TestCaseContext, params: PerformanceDataCaseParameters = {testCaseIdx: "001"}): string => {
    const {testCaseIdx, suiteId} = params;
    const stepResults = testCase
        .getChildren()
        .filter((child) => {
            return (isPresent(child.id) && child.id.length)
        })
        .map((child, idx) => performanceDataStep(child as TestStepContext, {
            testStepIdx: padNumberWithZeros(idx + 1, 3),
            testCaseIdx,
        }))
        .join(" ");

    return oneLine(`
c_${testCaseIdx}__state=${getNagiosResultState(testCase)};;;;
c_${testCaseIdx}__warning=${testCase.warningTime}s;;;;
c_${testCaseIdx}__critical=${testCase.criticalTime}s;;;;
c_${testCaseIdx}_${getEntityId(testCase)}=${getOutputDuration(testCase)};${testCase.warningTime};${testCase.criticalTime};;
${stepResults}
    `).split(" ").join("|");
};