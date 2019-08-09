import {TestCaseContext, TestContextEntity, TestStepContext, TestSuiteContext} from "@sakuli/core";
import {renderDetailedSuiteSummary} from "./detailed-summary-suite.function";
import {renderDetailedCaseSummary} from "./detailed-summary-case.function";
import {renderDetailedStepSummary} from "./detailed-summary-step.function";
import {ifPresent, Maybe} from "@sakuli/commons";

const UNKNOWN_SUITE = "UNKNOWN_SUITE";
const UNKNOWN_CASE = "UNKNOWN_CASE";

export interface DetailedSummaryData {
    suiteId?: Maybe<string>
    caseId?: Maybe<string>
}

export const renderDetailedSummary = (testContextEntity: TestContextEntity, params?: DetailedSummaryData): string => {
    const {suiteId, caseId} = (params) ? params : ({
        caseId: UNKNOWN_CASE,
        suiteId: UNKNOWN_SUITE
    });
    switch (testContextEntity.kind) {
        case "suite":
            return renderDetailedSuiteSummary(testContextEntity as TestSuiteContext);
        case "case":
            return renderDetailedCaseSummary(testContextEntity as TestCaseContext,
                ifPresent(suiteId, suiteId => suiteId, () => UNKNOWN_SUITE)
            );
        case "step":
            return renderDetailedStepSummary(testContextEntity as TestStepContext,
                ifPresent(caseId, caseId => caseId, () => UNKNOWN_CASE)
            );
        default:
            return "";
    }
};