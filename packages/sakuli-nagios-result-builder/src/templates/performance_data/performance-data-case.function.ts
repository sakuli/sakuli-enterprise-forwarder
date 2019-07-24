import {TestCaseContext, TestStepContext} from "@sakuli/core";
import {oneLine} from "common-tags";
import {performanceMetaData} from "./performance-meta-data.function";
import {getOutputDuration} from "@sakuli/result-builder-commons";
import {performanceDataStep} from "./performance-data-step.function";
import {padNumberWithZeros} from "./pad-number.function";
import {ifPresent, Maybe} from "@sakuli/commons";
import {getNagiosResultState} from "../../get-nagios-result-state.function";

export interface PerformanceDataCaseParameters {
    testCaseIdx: Maybe<string>
    suiteId?: Maybe<string>
}

export const performanceDataCase = (testCase: TestCaseContext, params: PerformanceDataCaseParameters = {testCaseIdx: "001"}): string => {
    const {testCaseIdx, suiteId} = params;
    const stepResults = testCase
        .getChildren()
        .map((child, idx) => performanceDataStep(child as TestStepContext, {
            testStepIdx: padNumberWithZeros(idx + 1, 3),
            testCaseIdx,
        }))
        .join(" ");

    return oneLine(`
${ifPresent(suiteId, (suiteId: string) => performanceMetaData(suiteId, "case"), () => "")}
c_${testCaseIdx}__state=${getNagiosResultState(testCase)};;;;
c_${testCaseIdx}__warning=${testCase.warningTime}s;;;;
c_${testCaseIdx}__critical=${testCase.criticalTime}s;;;;
c_${testCaseIdx}_${testCase.id}=${getOutputDuration(testCase)};${testCase.warningTime};${testCase.criticalTime};;
${stepResults}
    `)
};