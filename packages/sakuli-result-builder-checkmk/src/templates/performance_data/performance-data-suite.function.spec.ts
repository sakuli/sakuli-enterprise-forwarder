import {TestSuiteContext} from "@sakuli/core";
import {TestSuite_OK} from "../../__mocks__/test-suite-ok.entity";
import {performanceDataSuite} from "./performance-data-suite.function";
import {TestSuite_WARNING_IN_SUITE} from "../../__mocks__/test-suite-warning-in-suite.entity";
import {TestSuite_WARNING_IN_CASE} from "../../__mocks__/test-suite-warning-in-case.entity";
import {TestSuite_WARNING_IN_STEP} from "../../__mocks__/test-suite-warning-in-step.entity";
import {TestSuite_CRITICAL_IN_SUITE} from "../../__mocks__/test-suite-critical-in-suite.entity";
import {TestSuite_CRITICAL_IN_CASE} from "../../__mocks__/test-suite-critical-in-case.entity";
import {TestSuite_ERRORS} from "../../__mocks__/test-suite-error.entity";

describe("performanceDataSuite", () => {
    it.each(<[TestSuiteContext, string][]>[
            [TestSuite_OK, "suite__state=0;;;;|suite__warning=300s;;;;|suite__critical=400s;;;;|suite_example_xfce=44.99s;300;400;;|c_001__state=0;;;;|c_001__warning=20s;;;;|c_001__critical=30s;;;;|c_001_case1=14.02s;20;30;;|s_001_001_Test_Sahi_landing_page=1.16s;5;;;|s_001_002_Calculation=7.28s;10;;;|s_001_003_Editor=1.48s;10;;;|c_002__state=0;;;;|c_002__warning=20s;;;;|c_002__critical=30s;;;;|c_002_case2=13.58s;20;30;;|s_002_001_Test_Sahi_landing_page_(case2)=1.03s;5;;;|s_002_002_Calculation_(case2)=7.07s;10;;;|s_002_003_Editor_(case2)=1.37s;10;;;"],
            [TestSuite_WARNING_IN_SUITE, "suite__state=1;;;;|suite__warning=3s;;;;|suite__critical=400s;;;;|suite_example_xfce=46.94s;3;400;;|c_001__state=0;;;;|c_001__warning=20s;;;;|c_001__critical=30s;;;;|c_001_case1=14.13s;20;30;;|s_001_001_Test_Sahi_landing_page=1.21s;5;;;|s_001_002_Calculation=7.40s;10;;;|s_001_003_Editor=1.41s;10;;;|c_002__state=0;;;;|c_002__warning=20s;;;;|c_002__critical=30s;;;;|c_002_case2=13.58s;20;30;;|s_002_001_Test_Sahi_landing_page_(case2)=1.06s;5;;;|s_002_002_Calculation_(case2)=7.07s;10;;;|s_002_003_Editor_(case2)=1.34s;10;;;"],
            [TestSuite_WARNING_IN_CASE, "suite__state=1;;;;|suite__warning=300s;;;;|suite__critical=400s;;;;|suite_example_xfce=42.84s;300;400;;|c_001__state=0;;;;|c_001__warning=20s;;;;|c_001__critical=30s;;;;|c_001_case1=14.03s;20;30;;|s_001_001_Test_Sahi_landing_page=1.15s;5;;;|s_001_002_Calculation=7.32s;10;;;|s_001_003_Editor=1.43s;10;;;|c_002__state=1;;;;|c_002__warning=2s;;;;|c_002__critical=30s;;;;|c_002_case2=13.54s;2;30;;|s_002_001_Test_Sahi_landing_page_(case2)=0.93s;5;;;|s_002_002_Calculation_(case2)=7.12s;10;;;|s_002_003_Editor_(case2)=1.36s;10;;;"],
            [TestSuite_WARNING_IN_STEP, "suite__state=1;;;;|suite__warning=300s;;;;|suite__critical=400s;;;;|suite_example_xfce=44.75s;300;400;;|c_001__state=0;;;;|c_001__warning=20s;;;;|c_001__critical=30s;;;;|c_001_case1=13.83s;20;30;;|s_001_001_Test_Sahi_landing_page=1.08s;5;;;|s_001_002_Calculation=7.13s;10;;;|s_001_003_Editor=1.53s;10;;;|c_002__state=1;;;;|c_002__warning=20s;;;;|c_002__critical=30s;;;;|c_002_case2=13.43s;20;30;;|s_002_001_Test_Sahi_landing_page_(case2)=0.92s;5;;;|s_002_002_Calculation_(case2)=7.00s;1;;;|s_002_003_Editor_(case2)=1.39s;10;;;"],
            [TestSuite_CRITICAL_IN_SUITE, "suite__state=2;;;;|suite__warning=30s;;;;|suite__critical=40s;;;;|suite_example_xfce=44.81s;30;40;;|c_001__state=0;;;;|c_001__warning=20s;;;;|c_001__critical=30s;;;;|c_001_case1=13.91s;20;30;;|s_001_001_Test_Sahi_landing_page=1.16s;5;;;|s_001_002_Calculation=7.24s;10;;;|s_001_003_Editor=1.43s;10;;;|c_002__state=0;;;;|c_002__warning=20s;;;;|c_002__critical=30s;;;;|c_002_case2=13.55s;20;30;;|s_002_001_Test_Sahi_landing_page_(case2)=1.05s;5;;;|s_002_002_Calculation_(case2)=7.03s;10;;;|s_002_003_Editor_(case2)=1.39s;10;;;"],
            [TestSuite_CRITICAL_IN_CASE, "suite__state=2;;;;|suite__warning=300s;;;;|suite__critical=400s;;;;|suite_example_xfce=46.96s;300;400;;|c_001__state=0;;;;|c_001__warning=20s;;;;|c_001__critical=30s;;;;|c_001_case1=14.13s;20;30;;|s_001_001_Test_Sahi_landing_page=1.28s;5;;;|s_001_002_Calculation=7.30s;10;;;|s_001_003_Editor=1.45s;10;;;|c_002__state=2;;;;|c_002__warning=2s;;;;|c_002__critical=3s;;;;|c_002_case2=13.70s;2;3;;|s_002_001_Test_Sahi_landing_page_(case2)=1.08s;5;;;|s_002_002_Calculation_(case2)=7.11s;10;;;|s_002_003_Editor_(case2)=1.42s;10;;;"],
            [TestSuite_ERRORS, "suite__state=2;;;;|suite__warning=300s;;;;|suite__critical=400s;;;;|suite_example_xfce=U;300;400;;|c_001__state=0;;;;|c_001__warning=20s;;;;|c_001__critical=30s;;;;|c_001_case1=14.20s;20;30;;|s_001_001_Test_Sahi_landing_page=1.14s;5;;;|s_001_002_Calculation=7.53s;10;;;|s_001_003_Editor=1.45s;10;;;|c_002__state=2;;;;|c_002__warning=20s;;;;|c_002__critical=30s;;;;|c_002_case2=U;20;30;;|s_002_001_Test_Sahi_landing_page_(case2)=U;5;;;|s_002_002_Calculation_(case2)=7.03s;10;;;|s_002_003_Editor_(case2)=1.39s;10;;;"],
        ]
    )("should render", (testContextEntity: TestSuiteContext, expected: string) => {
        // GIVEN

        // WHEN
        const result = performanceDataSuite(testContextEntity);

        // THEN
        expect(result).toEqual(expected);
    });
});