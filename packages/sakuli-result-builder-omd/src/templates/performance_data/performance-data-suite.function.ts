import {TestCaseContext, TestContextEntity} from "@sakuli/core";
import {oneLine} from "common-tags";
import {getNagiosResultState, getOutputDuration, padNumberWithZeros} from "@sakuli/result-builder-commons";
import {performanceDataCase} from "./performance-data-case.function";

export const performanceDataSuite = (testSuite: TestContextEntity): string => {
    const testCases = testSuite
        .getChildren()
        .map((child, idx) => performanceDataCase(child as TestCaseContext, {
            testCaseIdx: padNumberWithZeros(idx + 1, 3)
        }))
        .join(" ");

    return oneLine(`
suite_${testSuite.id}=${getOutputDuration(testSuite)};${testSuite.warningTime};${testSuite.criticalTime};;
graph_type_suite=0;;;;
suite__state=${getNagiosResultState(testSuite)};;;;
suite__warning=${testSuite.warningTime}s;;;;
suite__critical=${testSuite.criticalTime}s;;;;
${testCases}
    `)
};