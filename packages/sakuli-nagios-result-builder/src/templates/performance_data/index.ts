import {TestCaseContext, TestContextEntity, TestStepContext} from "@sakuli/core";
import {oneLineTrim} from "common-tags";
import {performanceDataSuite} from "./performance-data-suite.function";
import {performanceDataCase} from "./performance-data-case.function";
import {performanceDataStep} from "./performance-data-step.function";
import {Maybe} from "@sakuli/commons";

export const renderPerformanceData = (testContextEntity: TestContextEntity, suiteId?: Maybe<string>): string => {
    switch (testContextEntity.kind) {
        case "suite":
            return oneLineTrim(`
                |
                ${performanceDataSuite(testContextEntity)}
            `);
        case "case":
            return oneLineTrim(`
                |
                ${performanceDataCase(testContextEntity as TestCaseContext, {testCaseIdx: "001", suiteId})}
            `);
        case "step":
            return oneLineTrim(`
                |
                ${performanceDataStep(testContextEntity as TestStepContext, {testStepIdx: "001", suiteId})}
            `);
        default:
            return "";
    }
};