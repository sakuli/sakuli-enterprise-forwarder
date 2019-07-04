import {renderShortSuiteSummary} from "./short-summary-suite.function";
import {renderShortCaseSummary} from "./short-summary-case.function";
import {renderShortStepSummary} from "./short-summary-step.function";
import {TestCaseContext, TestContextEntity, TestStepContext, TestSuiteContext} from "@sakuli/core";
import {ifPresent, Maybe} from "@sakuli/commons";

const UNKNOWN_SUITE = "UNKNOWN_SUITE";
const UNKNOWN_CASE = "UNKNOWN_CASE";

export interface ShortSummaryData {
    suiteId?: Maybe<string>
    caseId?: Maybe<string>
}

export const renderShortSummary = (testContextEntity: TestContextEntity, params?: ShortSummaryData): string => {
    const {suiteId, caseId} = (params) ? params : ({
        caseId: UNKNOWN_CASE,
        suiteId: UNKNOWN_SUITE
    });
    switch (testContextEntity.kind) {
        case "suite":
            return renderShortSuiteSummary(testContextEntity as TestSuiteContext);
        case "case":
            return renderShortCaseSummary(testContextEntity as TestCaseContext,
                ifPresent(suiteId, suiteId => suiteId, () => UNKNOWN_SUITE)
            );
        case "step":
            return renderShortStepSummary(testContextEntity as TestStepContext,
                ifPresent(caseId, caseId => caseId, () => UNKNOWN_CASE),
                ifPresent(suiteId, suiteId => suiteId, () => UNKNOWN_SUITE)
            );
        default:
            return "";
    }
};
