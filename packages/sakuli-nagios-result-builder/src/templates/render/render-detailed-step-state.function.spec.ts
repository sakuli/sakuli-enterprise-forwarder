import {TestContextEntity} from "@sakuli/core";
import {TestStep_OK} from "../../__mocks__/test-step-ok.entity";
import {TestStep_WARNING} from "../../__mocks__/test-step-warning.entity";
import {TestStep_CRITICAL} from "../../__mocks__/test-step-critical.entity";
import {renderDetailedTestStepState} from "./render-detailed-step-state.function";

describe("renderDetailedStepState", () => {
    it.each(<[TestContextEntity, string][]>[
        [TestStep_OK, "(7.28s) ."],
        [TestStep_WARNING, "(7.00s/warn at 1s) ."],
        [TestStep_CRITICAL, "(7.00s/crit at 2s) ."],
    ])("should render", (testCase: TestContextEntity, expected: string) => {
        // GIVEN

        // WHEN
        const result = renderDetailedTestStepState(testCase);

        // THEN
        expect(result).toEqual(expected);
    });
});