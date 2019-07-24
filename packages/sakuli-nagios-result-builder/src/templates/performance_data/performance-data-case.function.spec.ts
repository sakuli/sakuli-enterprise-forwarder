import {TestCaseContext} from "@sakuli/core";
import {TestCase_OK} from "../../__mocks__/test-case-ok.entity";
import {TestCase_WARNING} from "../../__mocks__/test-case-warning.entity";
import {TestCase_WARNING_IN_STEP} from "../../__mocks__/test-case-warning-in-step.entity";
import {TestCase_CRITICAL} from "../../__mocks__/test-case-critical.entity";
import {TestCase_CRITICAL_IN_STEP} from "../../__mocks__/test-case-critical-in-step.entity";
import {TestCase_ERRORS} from "../../__mocks__/test-case-errors.entity";
import {performanceDataCase} from "./performance-data-case.function";

describe("performanceDataCase", () => {
    it.each(<[TestCaseContext, string][]>[
            [TestCase_OK, "suite_example_xfce=0;;;; graph_type_case=0;;;; c_001__state=0;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case1=14.02s;20;30;; s_001_001_Test_Sahi_landing_page=1.16s;5;;; s_001_002_Calculation=7.28s;10;;; s_001_003_Editor=1.48s;10;;;"],
            [TestCase_WARNING, "suite_example_xfce=0;;;; graph_type_case=0;;;; c_001__state=1;;;; c_001__warning=2s;;;; c_001__critical=30s;;;; c_001_case2=13.54s;2;30;; s_001_001_Test_Sahi_landing_page_(case2)=0.93s;5;;; s_001_002_Calculation_(case2)=7.12s;10;;; s_001_003_Editor_(case2)=1.36s;10;;;"],
            [TestCase_WARNING_IN_STEP, "suite_example_xfce=0;;;; graph_type_case=0;;;; c_001__state=1;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case2=13.43s;20;30;; s_001_001_Test_Sahi_landing_page_(case2)=0.92s;5;;; s_001_002_Calculation_(case2)=7.00s;1;;; s_001_003_Editor_(case2)=1.39s;10;;;"],
            [TestCase_CRITICAL, "suite_example_xfce=0;;;; graph_type_case=0;;;; c_001__state=2;;;; c_001__warning=2s;;;; c_001__critical=3s;;;; c_001_case2=13.70s;2;3;; s_001_001_Test_Sahi_landing_page_(case2)=1.08s;5;;; s_001_002_Calculation_(case2)=7.11s;10;;; s_001_003_Editor_(case2)=1.42s;10;;;"],
            [TestCase_CRITICAL_IN_STEP, "suite_example_xfce=0;;;; graph_type_case=0;;;; c_001__state=2;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case2=13.43s;20;30;; s_001_001_Test_Sahi_landing_page_(case2)=0.92s;5;;; s_001_002_Calculation_(case2)=7.00s;1;;; s_001_003_Editor_(case2)=1.39s;10;;;"],
            [TestCase_ERRORS, "suite_example_xfce=0;;;; graph_type_case=0;;;; c_001__state=2;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case2=U;20;30;; s_001_001_Test_Sahi_landing_page_(case2)=U;5;;; s_001_002_Calculation_(case2)=7.03s;10;;; s_001_003_Editor_(case2)=1.39s;10;;;"],
        ]
    )("should render", (testContextEntity: TestCaseContext, expected: string) => {
        // GIVEN

        // WHEN
        const result = performanceDataCase(testContextEntity, {testCaseIdx: "001", suiteId: "example_xfce"});

        // THEN
        expect(result).toEqual(expected);
    });

    it.each(<[TestCaseContext, string][]>[
            [TestCase_OK, "c_001__state=0;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case1=14.02s;20;30;; s_001_001_Test_Sahi_landing_page=1.16s;5;;; s_001_002_Calculation=7.28s;10;;; s_001_003_Editor=1.48s;10;;;"],
            [TestCase_WARNING, "c_001__state=1;;;; c_001__warning=2s;;;; c_001__critical=30s;;;; c_001_case2=13.54s;2;30;; s_001_001_Test_Sahi_landing_page_(case2)=0.93s;5;;; s_001_002_Calculation_(case2)=7.12s;10;;; s_001_003_Editor_(case2)=1.36s;10;;;"],
            [TestCase_WARNING_IN_STEP, "c_001__state=1;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case2=13.43s;20;30;; s_001_001_Test_Sahi_landing_page_(case2)=0.92s;5;;; s_001_002_Calculation_(case2)=7.00s;1;;; s_001_003_Editor_(case2)=1.39s;10;;;"],
            [TestCase_CRITICAL, "c_001__state=2;;;; c_001__warning=2s;;;; c_001__critical=3s;;;; c_001_case2=13.70s;2;3;; s_001_001_Test_Sahi_landing_page_(case2)=1.08s;5;;; s_001_002_Calculation_(case2)=7.11s;10;;; s_001_003_Editor_(case2)=1.42s;10;;;"],
            [TestCase_CRITICAL_IN_STEP, "c_001__state=2;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case2=13.43s;20;30;; s_001_001_Test_Sahi_landing_page_(case2)=0.92s;5;;; s_001_002_Calculation_(case2)=7.00s;1;;; s_001_003_Editor_(case2)=1.39s;10;;;"],
            [TestCase_ERRORS, "c_001__state=2;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case2=U;20;30;; s_001_001_Test_Sahi_landing_page_(case2)=U;5;;; s_001_002_Calculation_(case2)=7.03s;10;;; s_001_003_Editor_(case2)=1.39s;10;;;"],
        ]
    )("should render without metadata", (testContextEntity: TestCaseContext, expected: string) => {
        // GIVEN

        // WHEN
        const result = performanceDataCase(testContextEntity, {testCaseIdx: "001"});

        // THWN
        expect(result).toEqual(expected);
    });
});
