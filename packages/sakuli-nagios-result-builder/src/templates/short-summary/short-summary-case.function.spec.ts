import {renderShortCaseSummary} from "./short-summary-case.function";
import {TestCase_WARNING_IN_STEP} from "../../__mocks__/test-case-warning-in-step.entity";
import {TestCaseContext} from "@sakuli/core";
import {TestCase_OK} from "../../__mocks__/test-case-ok.entity";
import {TestCase_WARNING} from "../../__mocks__/test-case-warning.entity";
import {TestCase_CRITICAL} from "../../__mocks__/test-case-critical.entity";
import {TestCase_CRITICAL_IN_STEP} from "../../__mocks__/test-case-critical-in-step.entity";
import {TestCase_ERRORS} from "../../__mocks__/test-case-errors.entity";

describe("short-summary-case", () => {
    it.each(<[TestCaseContext, string, string][]>[
        [TestCase_OK, "example_xfce", `[OK] Case "case1" of Sakuli suite "example_xfce" ok (14.02s). (Last suite run: 01.01.70 10:30:14)`],
        [TestCase_WARNING, "example_xfce", `[WARN] Case \"case2\" of Sakuli suite \"example_xfce\" warning case \"case2\" over runtime (13.54s/warn at 2s). (Last suite run: 01.01.70 10:34:33)`],
        [TestCase_WARNING_IN_STEP, "example_xfce", `[WARN] Case "case2" of Sakuli suite "example_xfce" warning in step, step "Calculation_(case2)" over runtime (7.00s/warn at 1s). (Last suite run: 01.01.70 10:31:33)`],
        [TestCase_CRITICAL, "example_xfce", `[CRIT] Case "case2" of Sakuli suite "example_xfce" critical case "case2" over runtime (13.70s/crit at 3s). (Last suite run: 01.01.70 10:35:33)`],
        [TestCase_CRITICAL_IN_STEP, "example_xfce", `[CRIT] Case "case2" of Sakuli suite "example_xfce" critical in step. (Last suite run: 01.01.70 10:31:33)`],
        [TestCase_ERRORS, "example_xfce", `[CRIT] Case "case2" of Sakuli suite "example_xfce" (13.55s) EXCEPTION: STEP "Test_Sahi_landing_page_(case2)": _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.c...`],
        ])("should render state %o with parent %s to result %s", (testCase: TestCaseContext, parentId: string, expected: string) => {
        // GIVEN

        // WHEN
        const result = renderShortCaseSummary(testCase, parentId);

        // THEN
        expect(result).toEqual(expected);
    });
});