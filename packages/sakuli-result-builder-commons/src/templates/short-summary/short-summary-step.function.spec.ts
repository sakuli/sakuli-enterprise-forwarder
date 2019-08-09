import {TestStepContext} from "@sakuli/core";
import {TestStep_OK} from "../../__mocks__/test-step-ok.entity";
import {TestStep_WARNING} from "../../__mocks__/test-step-warning.entity";
import {TestStep_CRITICAL} from "../../__mocks__/test-step-critical.entity";
import {TestStep_ERRORS} from "../../__mocks__/test-step-error.entity";
import {renderShortStepSummary} from "./short-summary-step.function";

describe("short-summary-step", () => {
    it.each(<[TestStepContext, string, string, string][]>[
        [TestStep_OK, "case2", "example_xfce", `[OK] Step "Calculation" in case "case2" of Sakuli suite "example_xfce" ok (7.28s). (Last test step run: 01.01.70 10:30:07)`],
        [TestStep_WARNING, "case2", "example_xfce", `[WARN] Step "Calculation" in case "case2" of Sakuli suite "example_xfce" warning step "Calculation" over runtime (7.00s/warn at 1s). (Last test step run: 01.01.70 10:31:07)`],
        [TestStep_CRITICAL, "case2", "example_xfce", `[CRIT] Step "Calculation" in case "case2" of Sakuli suite "example_xfce" critical step "Calculation" over runtime (7.00s/crit at 2s). (Last test step run: 01.01.70 10:31:07)`],
        [TestStep_ERRORS, "case2", "example_xfce", `[CRIT] Step "Test_Sahi_landing_page" in case "case2" of Sakuli suite "example_xfce" (1.05s) EXCEPTION: _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1...`],
    ])("should render state %o with parent %s to result %s", (testStep: TestStepContext, caseId: string, suiteId: string, expected: string) => {
        // GIVEN

        // WHEN
        const result = renderShortStepSummary(testStep, caseId, suiteId);

        // THEN
        expect(result).toEqual(expected);
    });
});
