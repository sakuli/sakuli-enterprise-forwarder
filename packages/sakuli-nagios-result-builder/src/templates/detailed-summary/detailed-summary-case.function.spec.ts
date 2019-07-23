import {TestCase_OK} from "../../__mocks__/test-case-ok.entity";
import {renderDetailedCaseSummary} from "./detailed-summary-case.function";
import {TestCaseContext, TestContextEntity} from "@sakuli/core";
import {TestCase_WARNING} from "../../__mocks__/test-case-warning.entity";
import {TestCase_WARNING_IN_STEP} from "../../__mocks__/test-case-warning-in-step.entity";
import {TestCase_CRITICAL} from "../../__mocks__/test-case-critical.entity";
import {TestCase_ERRORS} from "../../__mocks__/test-case-errors.entity";

describe("detailedSummaryCase", () => {
    it.each(<[TestContextEntity, string][]>[
        [TestCase_OK, "<style>.modalDialog {width: 640px;}.modalDialog:target {width: auto;margin: 20px auto;overflow: scroll;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999;opacity: 1;pointer-events: auto;}.modalDialog:target .close {display: block;}.modalDialog:target .screenshot {width: 100%;border: 2px solid #333;}.screenshot {width: 98%;border: 2px solid  gray;display: block;margin-left: auto;margin-right: auto;margin-bottom: 4px;cursor: -webkit-zoom-in;cursor: -moz-zoom-in;}.close {display: none;background: #aaa;color: #fff;line-height: 25px;position: absolute;right: 10px;text-align: center;top: 25px;width: 65px;text-decoration: none;font-weight: bold;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;}.close:hover {background: #333;}</style><table style=\"border-collapse: collapse;\"><tr valign=\"top\"><td class=\"serviceOK\">[OK] Case \"case1\" of Sakuli suite \"example_xfce\" ok (14.02s) . (Last suite run: 01.01.70 10:30:14)</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Test_Sahi_landing_page\" ran in 1.16s - ok</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Calculation\" ran in 7.28s - ok</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Editor\" ran in 1.48s - ok</td></tr></table>"],
        [TestCase_WARNING, "<style>.modalDialog {width: 640px;}.modalDialog:target {width: auto;margin: 20px auto;overflow: scroll;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999;opacity: 1;pointer-events: auto;}.modalDialog:target .close {display: block;}.modalDialog:target .screenshot {width: 100%;border: 2px solid #333;}.screenshot {width: 98%;border: 2px solid  gray;display: block;margin-left: auto;margin-right: auto;margin-bottom: 4px;cursor: -webkit-zoom-in;cursor: -moz-zoom-in;}.close {display: none;background: #aaa;color: #fff;line-height: 25px;position: absolute;right: 10px;text-align: center;top: 25px;width: 65px;text-decoration: none;font-weight: bold;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;}.close:hover {background: #333;}</style><table style=\"border-collapse: collapse;\"><tr valign=\"top\"><td class=\"serviceWARNING\">[WARN] Case \"case2\" of Sakuli suite \"example_xfce\" warning (13.54s/warn at 2s) . (Last suite run: 01.01.70 10:34:33)</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Test_Sahi_landing_page_(case2)\" ran in 0.93s - ok</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Calculation_(case2)\" ran in 7.12s - ok</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Editor_(case2)\" ran in 1.36s - ok</td></tr></table>"],
        [TestCase_WARNING_IN_STEP, "<style>.modalDialog {width: 640px;}.modalDialog:target {width: auto;margin: 20px auto;overflow: scroll;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999;opacity: 1;pointer-events: auto;}.modalDialog:target .close {display: block;}.modalDialog:target .screenshot {width: 100%;border: 2px solid #333;}.screenshot {width: 98%;border: 2px solid  gray;display: block;margin-left: auto;margin-right: auto;margin-bottom: 4px;cursor: -webkit-zoom-in;cursor: -moz-zoom-in;}.close {display: none;background: #aaa;color: #fff;line-height: 25px;position: absolute;right: 10px;text-align: center;top: 25px;width: 65px;text-decoration: none;font-weight: bold;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;}.close:hover {background: #333;}</style><table style=\"border-collapse: collapse;\"><tr valign=\"top\"><td class=\"serviceWARNING\">[WARN] Case \"case2\" of Sakuli suite \"example_xfce\" warning in step , step \"Calculation_(case2)\" over runtime (7.00s/warn at 1s) . (Last suite run: 01.01.70 10:31:33)</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Test_Sahi_landing_page_(case2)\" ran in 0.92s - ok</td></tr><tr valign=\"top\"><td class=\"serviceWARNING\">[WARN] step \"Calculation_(case2)\" over runtime (7.00s/warn at 1s)</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Editor_(case2)\" ran in 1.39s - ok</td></tr></table>"],
        [TestCase_CRITICAL, "<style>.modalDialog {width: 640px;}.modalDialog:target {width: auto;margin: 20px auto;overflow: scroll;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999;opacity: 1;pointer-events: auto;}.modalDialog:target .close {display: block;}.modalDialog:target .screenshot {width: 100%;border: 2px solid #333;}.screenshot {width: 98%;border: 2px solid  gray;display: block;margin-left: auto;margin-right: auto;margin-bottom: 4px;cursor: -webkit-zoom-in;cursor: -moz-zoom-in;}.close {display: none;background: #aaa;color: #fff;line-height: 25px;position: absolute;right: 10px;text-align: center;top: 25px;width: 65px;text-decoration: none;font-weight: bold;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;}.close:hover {background: #333;}</style><table style=\"border-collapse: collapse;\"><tr valign=\"top\"><td class=\"serviceCRITICAL\">[CRIT] Case \"case2\" of Sakuli suite \"example_xfce\" critical (13.70s/crit at 3s) . (Last suite run: 01.01.70 10:35:33)</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Test_Sahi_landing_page_(case2)\" ran in 1.08s - ok</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Calculation_(case2)\" ran in 7.11s - ok</td></tr><tr valign=\"top\"><td class=\"serviceOK\">[OK] step \"Editor_(case2)\" ran in 1.42s - ok</td></tr></table>"],
    ])(`should render %o to %s`, (testCase: TestContextEntity, expected: string) => {
        // GIVEN

        // WHEN
        const result = renderDetailedCaseSummary(testCase as TestCaseContext, "example_xfce");

        // THEN
        expect(result).toEqual(expected);
    });

    it(`should render with error div`, () => {
        // GIVEN

        // WHEN
        const result = renderDetailedCaseSummary(TestCase_ERRORS as TestCaseContext, "example_xfce");

        // THEN
        expect(result).toContain(`<style>.modalDialog {width: 640px;}.modalDialog:target {width: auto;margin: 20px auto;overflow: scroll;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999;opacity: 1;pointer-events: auto;}.modalDialog:target .close {display: block;}.modalDialog:target .screenshot {width: 100%;border: 2px solid #333;}.screenshot {width: 98%;border: 2px solid  gray;display: block;margin-left: auto;margin-right: auto;margin-bottom: 4px;cursor: -webkit-zoom-in;cursor: -moz-zoom-in;}.close {display: none;background: #aaa;color: #fff;line-height: 25px;position: absolute;right: 10px;text-align: center;top: 25px;width: 65px;text-decoration: none;font-weight: bold;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;}.close:hover {background: #333;}</style><table style="border-collapse: collapse;"><tr valign="top"><td class="serviceCRITICAL">[CRIT] Case "case2" of Sakuli suite "example_xfce" (13.55s) EXCEPTION: . . (Last suite run: 01.01.70 10:36:23)</td></tr><tr valign="top"><td class="serviceCRITICAL">[CRIT] step "Test_Sahi_landing_page_(case2)" EXCEPTION: _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>`);
        expect(result).toContain(`<a href="#close" title="Close" class="close">Close X</a><a href="#openModal"><img class="screenshot" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAQCAIAAAA3TN7NAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAABPdJREFUSInllX9MU1cUx89997YIVGgV2bIhAwXJWBSxAwRECuPHQAGVkMkQM4W5AYpMxR/RwRSjcYrBwVRANjEiDAY4lOAQg4zfY7gtGDPZ1HT8UIHSlgJiLO3+eOxSaAvG4bJk39w05577Oefec997p+jW3U74f4ioVGoAaG2qetT1YFracoH9Ykf3l3+qlyIyqlIBoEddD/x93rW1tZsClUj68gvz7B3cANRai0iXUxvQxKYNmSL8BWKBKEdVrMPW1s43ImOKiBv58QCgHB197j3+WyIq9VipXC4XAFydFqkmEgyACqC5pZ2dUl5bneIHOafTbv/aijFxcvXYHLtdMMfsJZ1bU0Gewis1rdNijFoNajUAgFKpBACGYIIxxpgQzBBMCAME9/YP0gCW1x6PH3bvS/jI2W1lbnFldn6Zg9A5Oz1VHzyzY4pTaQ4GIUAIAEClUgEAYjAiDEMwwgzGGGHyZ1f/4/5hWirLa4/83Kygde8FhIQaGRvNNjHxCQjanXyUXVIMyD/dGRPq55q0K3ZQIWedwSLh1ZKCyDU+G9f6/lhfU/btpQ0h3pFrfBpqqijQ+MON8NWi3XEfyKQS6qQ7snawSAgAwSIhOx0eUhzaGx/q55qcGPdkeJCSdTcrmUlPGROMMcEY9fYPi7v629ofDo6MEg6hd6FPt5obvf1X61zKzfzCQej8TXnNEse3L2SPt4O+nsdZly5Hxe04nrL/XvtvZy+Wbvp4+7kvT1Kg7ZfW3OIK15Xe58+e0rcv++peqWlljdzMdBd3UWFFbWBI2MWcMxSTS6UMgxgGjRfMYKZPNtT2R0+v7MnQUxUmHEww4eBxADE6x4BcajbPXOdSS2PtqpAwA4NZgSFhzXU1dMeo2E94PBMPL7+nI08S9n5maioQ+QZKensosDE6ztDQ2H/V2p+a6qmTpqW2prOp7uYKkQ+XwxW6uDXWVlNgqdCZoImXdPteDwBgwmEbNAJQT+zsk3gq3myTAalUMFdHH5LLpMbGPATA4/HkMhnNwBpcDgcAOISwtlqtpgCPN5v9HVQoJkVNsqkhl8nCg7zGngqDqf8Nq4WEQWNTtgP3irv01DImyk+Sg6NTbXXlmrAI7SUTU/6QYsCUL1AoFKZ8Ps2gmUqnPTI8bGRsrFAMCObMpc5RpZLD4Tx79kyTpIYpn3++sNzAYJb2sQn8DXV0dFzP2zpFkd3d3QAAekp9f9OWPfEfmvAF7p7vPB0Zaait/rmlad/BYwCw3N2zrKRgfWT0d8X5Lu6e4xk0U+my8y9kb4iKuXa1dPmKsah55q9WXbvi4eWblZFKSasFNp0dYgtLKwBw9/T5/urlgODQ3+/eqSgr3rk/heYkCCEAmG/9ZlFJwRR1srKxFyI9pVovXHTo8/ScM6fSjh3kcg3cPLxiEvaw8OaYhCNJiev83d5a4rg/5QTNoJlKp21jZx8e7G29cFHy0TTWuWXbrvQTh/O+ztyWeKCy/DLrPHA4NSlxq5n5K8czvoqOTUg9kpR9+qSZmXlkVKzmXqjlTodc2ldfXbpje6JSqRSLxRYWFprN9v79++xfro2NTea500udRK/Nt532Uv65fN0WX29om8GEBCGory5dHxbBvp+GhoYSiUSTEAgErCGXy9eHRRQU5b1u+W+UCnq/lRcUYRi0zMWroCjvOQOWuXgxzIweQb9mdqO/AAbcJzu9/py2AAAAAElFTkSuQmCC" /></a>`);
        expect(result).toContain(`<tr valign="top"><td class="serviceOK">[OK] step "Calculation_(case2)" ran in 7.03s - ok</td></tr><tr valign="top"><td class="serviceOK">[OK] step "Editor_(case2)" ran in 1.39s - ok</td></tr></table>`);
    });
});