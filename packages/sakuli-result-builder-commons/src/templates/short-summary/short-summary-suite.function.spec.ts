import {TestSuiteContext} from "@sakuli/core";
import {TestSuite_OK} from "../../__mocks__/test-suite-ok.entity";
import {TestSuite_WARNING_IN_STEP} from "../../__mocks__/test-suite-warning-in-step.entity";
import {TestSuite_CRITICAL_IN_SUITE} from "../../__mocks__/test-suite-critical-in-suite.entity";
import {TestSuite_CRITICAL_IN_CASE} from "../../__mocks__/test-suite-critical-in-case.entity";
import {TestSuite_ERRORS} from "../../__mocks__/test-suite-error.entity";
import {TestSuite_WARNING_IN_SUITE} from "../../__mocks__/test-suite-warning-in-suite.entity";
import {TestSuite_WARNING_IN_CASE} from "../../__mocks__/test-suite-warning-in-case.entity";
import {renderShortSuiteSummary} from "./short-summary-suite.function";

describe("short-summary-case", () => {
    it.each(<[TestSuiteContext, string][]>[
        [TestSuite_OK, `Sakuli suite "example_xfce" ok (44.99s). (Last suite run: 01.01.70 10:30:44)`],
        [TestSuite_WARNING_IN_SUITE, `Sakuli suite "example_xfce" warning (46.94s/warn at 3s). (Last suite run: 01.01.70 10:32:46)`],
        [TestSuite_WARNING_IN_CASE, `Sakuli suite "example_xfce" warning in case, case "case2" over runtime (13.54s/warn at 2s). (Last suite run: 01.01.70 10:34:42)`],
        [TestSuite_WARNING_IN_STEP, `Sakuli suite "example_xfce" warning in step, step "Calculation_(case2)" over runtime (7.00s/warn at 1s). (Last suite run: 01.01.70 10:31:44)`],
        [TestSuite_CRITICAL_IN_SUITE, `Sakuli suite "example_xfce" critical (44.81s/crit at 40s). (Last suite run: 01.01.70 10:33:44)`],
        [TestSuite_CRITICAL_IN_CASE, `Sakuli suite "example_xfce" critical in case, case "case2" over runtime (13.70s/crit at 3s). (Last suite run: 01.01.70 10:35:46)`],
        [TestSuite_ERRORS, `Sakuli suite "example_xfce" (44.80s) EXCEPTION: CASE "case2": STEP "Test_Sahi_landing_page_(case2)": _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://...`],
    ])("should render state %o with parent %s to result %s", (testSuite: TestSuiteContext, expected: string) => {
        // GIVEN

        // WHEN
        const result = renderShortSuiteSummary(testSuite);

        // THEN
        expect(result).toEqual(expected);
    });
});
