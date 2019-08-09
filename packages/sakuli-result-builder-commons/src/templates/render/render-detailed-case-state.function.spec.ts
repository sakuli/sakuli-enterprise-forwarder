import {TestCase_OK} from "../../__mocks__/test-case-ok.entity";
import {TestContextEntity} from "@sakuli/core";
import {renderDetailedTestCaseState} from "./render-detailed-case-state.function";
import {TestCase_WARNING} from "../../__mocks__/test-case-warning.entity";
import {TestCase_CRITICAL} from "../../__mocks__/test-case-critical.entity";
import {TestCase_WARNING_IN_STEP} from "../../__mocks__/test-case-warning-in-step.entity";
import {TestCase_CRITICAL_IN_STEP} from "../../__mocks__/test-case-critical-in-step.entity";

describe("renderDetailedCaseState", () => {
    it.each(<[TestContextEntity, string][]>[
        [TestCase_OK, "(14.02s)"],
        [TestCase_WARNING, "(13.54s/warn at 2s)"],
        [TestCase_WARNING_IN_STEP, ", step \"Calculation_(case2)\" over runtime (7.00s/warn at 1s)"],
        [TestCase_CRITICAL, "(13.70s/crit at 3s)"],
        [TestCase_CRITICAL_IN_STEP, ", step \"Calculation_(case2)\" over runtime (7.00s/crit at 2s)"],
    ])("should render", (testCase: TestContextEntity, expected: string) => {
        // GIVEN

        // WHEN
        const result = renderDetailedTestCaseState(testCase);

        // THEN
        expect(result).toEqual(expected);
    });
});