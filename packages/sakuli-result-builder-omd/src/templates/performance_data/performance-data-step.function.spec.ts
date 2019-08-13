import {TestStepContext} from "@sakuli/core";
import {TestStep_OK} from "../../__mocks__/test-step-ok.entity";
import {TestStep_WARNING} from "../../__mocks__/test-step-warning.entity";
import {TestStep_CRITICAL} from "../../__mocks__/test-step-critical.entity";
import {TestStep_ERRORS} from "../../__mocks__/test-step-error.entity";
import {performanceDataStep} from "./performance-data-step.function";

describe("performanceDataStep", () => {
    it.each(<[TestStepContext, string][]>[
            [TestStep_OK, "suite_example_xfce=0;;;; graph_type_step=0;;;; s_001_Calculation=7.28s;20;;;"],
            [TestStep_WARNING, "suite_example_xfce=0;;;; graph_type_step=0;;;; s_001_Calculation=7.00s;1;;;"],
            [TestStep_CRITICAL, "suite_example_xfce=0;;;; graph_type_step=0;;;; s_001_Calculation=7.00s;1;;;"],
            [TestStep_ERRORS, "suite_example_xfce=0;;;; graph_type_step=0;;;; s_001_Test_Sahi_landing_page=U;10;;;"],
        ]
    )("should render", (testContextEntity: TestStepContext, expected: string) => {
        // GIVEN

        // WHEN
        const result = performanceDataStep(testContextEntity, {testStepIdx: "001", suiteId: "example_xfce"});

        // THEN
        expect(result).toEqual(expected);
    });

    it.each(<[TestStepContext, string][]>[
            [TestStep_OK, "s_001_Calculation=7.28s;20;;;"],
            [TestStep_WARNING, "s_001_Calculation=7.00s;1;;;"],
            [TestStep_CRITICAL, "s_001_Calculation=7.00s;1;;;"],
            [TestStep_ERRORS, "s_001_Test_Sahi_landing_page=U;10;;;"],
        ]
    )("should render without metadata", (testContextEntity: TestStepContext, expected: string) => {
        // GIVEN

        // WHEN
        const result = performanceDataStep(testContextEntity, {testStepIdx: "001"});

        // THEN
        expect(result).toEqual(expected);
    });
});
