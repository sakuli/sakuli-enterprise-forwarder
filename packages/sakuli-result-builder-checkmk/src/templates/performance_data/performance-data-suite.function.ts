import {TestCaseContext, TestContextEntity} from "@sakuli/core";
import {oneLine} from "common-tags";
import {getEntityId, getNagiosResultState, getOutputDuration, padNumberWithZeros} from "@sakuli/result-builder-commons";
import {performanceDataCase} from "./performance-data-case.function";
import {isPresent} from "@sakuli/commons";

export const performanceDataSuite = (testSuite: TestContextEntity): string => {
    const testCases = testSuite
        .getChildren()
        .filter((child) => {
            return (isPresent(child.id) && child.id.length)
        })
        .map((child, idx) => performanceDataCase(child as TestCaseContext, {
            testCaseIdx: padNumberWithZeros(idx + 1, 3)
        }))
        .join(" ");

    return oneLine(`
suite__state=${getNagiosResultState(testSuite)};;;;
suite__warning=${testSuite.warningTime}s;;;;
suite__critical=${testSuite.criticalTime}s;;;;
suite_${getEntityId(testSuite)}=${getOutputDuration(testSuite)};${testSuite.warningTime};${testSuite.criticalTime};;
${testCases}
    `).split(" ").join("|")
};