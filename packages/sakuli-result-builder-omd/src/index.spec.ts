import {readFileSync} from 'fs';
import {join} from "path";
import {TestCaseContext, TestContextEntity, TestExecutionContext, TestSuiteContext} from "@sakuli/core";
import {SimpleLogger} from "@sakuli/commons";
import {TestCases, TestSteps, TestSuites} from './__mocks__';
import {OmdTestResultOutputBuilder} from "./index";
import {TestSuite_OK} from "./__mocks__/test-suite-ok.entity";
import {TestCase_OK} from "./__mocks__/test-case-ok.entity";
import {TestSuite_ERRORS} from "./__mocks__/test-suite-error.entity";
import {TestCase_ERRORS} from "./__mocks__/test-case-errors.entity";
import {TestCase_CRITICAL_IN_STEP} from "./__mocks__/test-case-critical-in-step.entity";

describe('suite templates', () => {
    let ctx: TestExecutionContext;
    let renderer: OmdTestResultOutputBuilder;

    beforeEach(() => {
        ctx = new TestExecutionContext(new SimpleLogger);
        renderer = new OmdTestResultOutputBuilder();
    });

    describe.each(Object.entries(TestSuites))('for %s', (key: string, testContextEntity: TestContextEntity) => {

        let properties: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                nagiosHost: 'my.nagios.host',
                serviceType: 'passive',
                nagiosServiceDescription: "example_xfce",
                nagiosCheckCommand: "check_sakuli",
                outputDetails: true
            };
            expected = readFileSync(join(__dirname, '__snapshots__', 'suites', key + '.txt')).toString();
        });

        it('should match static file', () => {
            const rendered = renderer.render(testContextEntity, {
                currentSuite: TestSuite_OK as TestSuiteContext,
                currentCase: TestCase_OK as TestCaseContext,
                props: properties
            });
            expect(rendered).toEqual(expected)
        })
    });

    describe('render error', () => {

        let properties: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                nagiosHost: 'my.nagios.host',
                serviceType: 'passive',
                nagiosServiceDescription: "example_xfce",
                nagiosCheckCommand: "check_sakuli",
                outputDetails: true
            };
            expected = readFileSync(join(__dirname, '__snapshots__', 'suites', 'TestSuite_ERRORS' + '.txt')).toString();
        });

        it('should match static file', () => {
            const rendered = renderer.render(TestSuite_ERRORS, {
                currentSuite: TestSuite_ERRORS as TestSuiteContext,
                currentCase: undefined,
                props: properties
            });
            expect(rendered).toContain(`type=passive
host_name=my.nagios.host
start_time=34560.000
finish_time=34604.800
return_code=2
service_description=example_xfce
output=Sakuli suite "example_xfce" (44.80s) EXCEPTION: CASE "case2": STEP "Test_Sahi_landing_page_(case2)": _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://...\\n<style>.modalDialog {width: 640px;}.modalDialog:target {width: auto;margin: 20px auto;overflow: scroll;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999;opacity: 1;pointer-events: auto;}.modalDialog:target .close {display: block;}.modalDialog:target .screenshot {width: 100%;border: 2px solid #333;}.screenshot {width: 98%;border: 2px solid  gray;display: block;margin-left: auto;margin-right: auto;margin-bottom: 4px;cursor: -webkit-zoom-in;cursor: -moz-zoom-in;}.close {display: none;background: #aaa;color: #fff;line-height: 25px;position: absolute;right: 10px;text-align: center;top: 25px;width: 65px;text-decoration: none;font-weight: bold;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;}.close:hover {background: #333;}</style><table style="border-collapse: collapse;"><tr valign="top"><td class="serviceCRITICAL">[CRIT] Sakuli suite "example_xfce" (44.80s) EXCEPTION: CASE "case2": STEP "Test_Sahi_landing_page_(case2)": _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>. . (Last suite run: 01.01.70 10:36:44)</td></tr><tr valign="top"><td class="serviceOK">[OK] case "case1" ran in 14.20s - ok</td></tr><tr valign="top"><td class="serviceCRITICAL">[CRIT] case "case2" EXCEPTION: STEP "Test_Sahi_landing_page_(case2)": _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>`);
            expect(rendered).toContain(`<a href="#close" title="Close" class="close">Close X</a><a href="#openModal"><img class="screenshot" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAQCAIAAAA3TN7NAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAABPdJREFUSInllX9MU1cUx89997YIVGgV2bIhAwXJWBSxAwRECuPHQAGVkMkQM4W5AYpMxR/RwRSjcYrBwVRANjEiDAY4lOAQg4zfY7gtGDPZ1HT8UIHSlgJiLO3+eOxSaAvG4bJk39w05577Oefec997p+jW3U74f4ioVGoAaG2qetT1YFracoH9Ykf3l3+qlyIyqlIBoEddD/x93rW1tZsClUj68gvz7B3cANRai0iXUxvQxKYNmSL8BWKBKEdVrMPW1s43ImOKiBv58QCgHB197j3+WyIq9VipXC4XAFydFqkmEgyACqC5pZ2dUl5bneIHOafTbv/aijFxcvXYHLtdMMfsJZ1bU0Gewis1rdNijFoNajUAgFKpBACGYIIxxpgQzBBMCAME9/YP0gCW1x6PH3bvS/jI2W1lbnFldn6Zg9A5Oz1VHzyzY4pTaQ4GIUAIAEClUgEAYjAiDEMwwgzGGGHyZ1f/4/5hWirLa4/83Kygde8FhIQaGRvNNjHxCQjanXyUXVIMyD/dGRPq55q0K3ZQIWedwSLh1ZKCyDU+G9f6/lhfU/btpQ0h3pFrfBpqqijQ+MON8NWi3XEfyKQS6qQ7snawSAgAwSIhOx0eUhzaGx/q55qcGPdkeJCSdTcrmUlPGROMMcEY9fYPi7v629ofDo6MEg6hd6FPt5obvf1X61zKzfzCQej8TXnNEse3L2SPt4O+nsdZly5Hxe04nrL/XvtvZy+Wbvp4+7kvT1Kg7ZfW3OIK15Xe58+e0rcv++peqWlljdzMdBd3UWFFbWBI2MWcMxSTS6UMgxgGjRfMYKZPNtT2R0+v7MnQUxUmHEww4eBxADE6x4BcajbPXOdSS2PtqpAwA4NZgSFhzXU1dMeo2E94PBMPL7+nI08S9n5maioQ+QZKensosDE6ztDQ2H/V2p+a6qmTpqW2prOp7uYKkQ+XwxW6uDXWVlNgqdCZoImXdPteDwBgwmEbNAJQT+zsk3gq3myTAalUMFdHH5LLpMbGPATA4/HkMhnNwBpcDgcAOISwtlqtpgCPN5v9HVQoJkVNsqkhl8nCg7zGngqDqf8Nq4WEQWNTtgP3irv01DImyk+Sg6NTbXXlmrAI7SUTU/6QYsCUL1AoFKZ8Ps2gmUqnPTI8bGRsrFAMCObMpc5RpZLD4Tx79kyTpIYpn3++sNzAYJb2sQn8DXV0dFzP2zpFkd3d3QAAekp9f9OWPfEfmvAF7p7vPB0Zaait/rmlad/BYwCw3N2zrKRgfWT0d8X5Lu6e4xk0U+my8y9kb4iKuXa1dPmKsah55q9WXbvi4eWblZFKSasFNp0dYgtLKwBw9/T5/urlgODQ3+/eqSgr3rk/heYkCCEAmG/9ZlFJwRR1srKxFyI9pVovXHTo8/ScM6fSjh3kcg3cPLxiEvaw8OaYhCNJiev83d5a4rg/5QTNoJlKp21jZx8e7G29cFHy0TTWuWXbrvQTh/O+ztyWeKCy/DLrPHA4NSlxq5n5K8czvoqOTUg9kpR9+qSZmXlkVKzmXqjlTodc2ldfXbpje6JSqRSLxRYWFprN9v79++xfro2NTea500udRK/Nt532Uv65fN0WX29om8GEBCGory5dHxbBvp+GhoYSiUSTEAgErCGXy9eHRRQU5b1u+W+UCnq/lRcUYRi0zMWroCjvOQOWuXgxzIweQb9mdqO/AAbcJzu9/py2AAAAAElFTkSuQmCC" /></a></div></div></td></tr></table>`);
        })
    })
});

describe('case templates', () => {
    let ctx: TestExecutionContext;
    let renderer: OmdTestResultOutputBuilder;

    beforeEach(() => {
        ctx = new TestExecutionContext(new SimpleLogger);
        renderer = new OmdTestResultOutputBuilder();
    });

    describe.each(Object.entries(TestCases))('for %s', (key: string, testContextEntity: TestContextEntity) => {

        let properties: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                nagiosHost: 'my.nagios.host',
                serviceType: 'passive',
                nagiosServiceDescription: "example_xfce",
                nagiosCheckCommand: "check_sakuli",
                outputDetails: true
            };
            expected = readFileSync(join(__dirname, '__snapshots__', 'cases', key + '.txt')).toString();
        });

        it('should match static file', () => {
            const rendered = renderer.render(testContextEntity, {
                currentSuite: TestSuite_OK as TestSuiteContext,
                currentCase: testContextEntity as TestCaseContext,
                props: properties
            });
            expect(rendered).toEqual(expected)
        })
    });

    describe('render error', () => {

        let properties: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                nagiosHost: 'my.nagios.host',
                serviceType: 'passive',
                nagiosServiceDescription: "example_xfce",
                nagiosCheckCommand: "check_sakuli",
                outputDetails: true
            };
            expected = readFileSync(join(__dirname, '__snapshots__', 'cases', 'TestCase_ERRORS' + '.txt')).toString();
        });

        it('should match static file', () => {
            const rendered = renderer.render(TestCase_ERRORS, {
                currentSuite: TestSuite_ERRORS as TestSuiteContext,
                currentCase: TestCase_ERRORS as TestCaseContext,
                props: properties
            });
            expect(rendered).toContain(`type=passive
host_name=my.nagios.host
start_time=34570.000
finish_time=34583.550
return_code=2
service_description=example_xfce_case2
output=Case "case2" of Sakuli suite "example_xfce" (13.55s) EXCEPTION: STEP "Test_Sahi_landing_page_(case2)": _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.c...\\n<style>.modalDialog {width: 640px;}.modalDialog:target {width: auto;margin: 20px auto;overflow: scroll;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999;opacity: 1;pointer-events: auto;}.modalDialog:target .close {display: block;}.modalDialog:target .screenshot {width: 100%;border: 2px solid #333;}.screenshot {width: 98%;border: 2px solid  gray;display: block;margin-left: auto;margin-right: auto;margin-bottom: 4px;cursor: -webkit-zoom-in;cursor: -moz-zoom-in;}.close {display: none;background: #aaa;color: #fff;line-height: 25px;position: absolute;right: 10px;text-align: center;top: 25px;width: 65px;text-decoration: none;font-weight: bold;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;}.close:hover {background: #333;}</style><table style="border-collapse: collapse;"><tr valign="top"><td class="serviceCRITICAL">[CRIT] Case "case2" of Sakuli suite "example_xfce" (13.55s) EXCEPTION: . . (Last suite run: 01.01.70 10:36:23)</td></tr><tr valign="top"><td class="serviceCRITICAL">[CRIT] step "Test_Sahi_landing_page_(case2)" EXCEPTION: _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>`);
            expect(rendered).toContain(`<a href="#close" title="Close" class="close">Close X</a><a href="#openModal"><img class="screenshot" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAQCAIAAAA3TN7NAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAABPdJREFUSInllX9MU1cUx89997YIVGgV2bIhAwXJWBSxAwRECuPHQAGVkMkQM4W5AYpMxR/RwRSjcYrBwVRANjEiDAY4lOAQg4zfY7gtGDPZ1HT8UIHSlgJiLO3+eOxSaAvG4bJk39w05577Oefec997p+jW3U74f4ioVGoAaG2qetT1YFracoH9Ykf3l3+qlyIyqlIBoEddD/x93rW1tZsClUj68gvz7B3cANRai0iXUxvQxKYNmSL8BWKBKEdVrMPW1s43ImOKiBv58QCgHB197j3+WyIq9VipXC4XAFydFqkmEgyACqC5pZ2dUl5bneIHOafTbv/aijFxcvXYHLtdMMfsJZ1bU0Gewis1rdNijFoNajUAgFKpBACGYIIxxpgQzBBMCAME9/YP0gCW1x6PH3bvS/jI2W1lbnFldn6Zg9A5Oz1VHzyzY4pTaQ4GIUAIAEClUgEAYjAiDEMwwgzGGGHyZ1f/4/5hWirLa4/83Kygde8FhIQaGRvNNjHxCQjanXyUXVIMyD/dGRPq55q0K3ZQIWedwSLh1ZKCyDU+G9f6/lhfU/btpQ0h3pFrfBpqqijQ+MON8NWi3XEfyKQS6qQ7snawSAgAwSIhOx0eUhzaGx/q55qcGPdkeJCSdTcrmUlPGROMMcEY9fYPi7v629ofDo6MEg6hd6FPt5obvf1X61zKzfzCQej8TXnNEse3L2SPt4O+nsdZly5Hxe04nrL/XvtvZy+Wbvp4+7kvT1Kg7ZfW3OIK15Xe58+e0rcv++peqWlljdzMdBd3UWFFbWBI2MWcMxSTS6UMgxgGjRfMYKZPNtT2R0+v7MnQUxUmHEww4eBxADE6x4BcajbPXOdSS2PtqpAwA4NZgSFhzXU1dMeo2E94PBMPL7+nI08S9n5maioQ+QZKensosDE6ztDQ2H/V2p+a6qmTpqW2prOp7uYKkQ+XwxW6uDXWVlNgqdCZoImXdPteDwBgwmEbNAJQT+zsk3gq3myTAalUMFdHH5LLpMbGPATA4/HkMhnNwBpcDgcAOISwtlqtpgCPN5v9HVQoJkVNsqkhl8nCg7zGngqDqf8Nq4WEQWNTtgP3irv01DImyk+Sg6NTbXXlmrAI7SUTU/6QYsCUL1AoFKZ8Ps2gmUqnPTI8bGRsrFAMCObMpc5RpZLD4Tx79kyTpIYpn3++sNzAYJb2sQn8DXV0dFzP2zpFkd3d3QAAekp9f9OWPfEfmvAF7p7vPB0Zaait/rmlad/BYwCw3N2zrKRgfWT0d8X5Lu6e4xk0U+my8y9kb4iKuXa1dPmKsah55q9WXbvi4eWblZFKSasFNp0dYgtLKwBw9/T5/urlgODQ3+/eqSgr3rk/heYkCCEAmG/9ZlFJwRR1srKxFyI9pVovXHTo8/ScM6fSjh3kcg3cPLxiEvaw8OaYhCNJiev83d5a4rg/5QTNoJlKp21jZx8e7G29cFHy0TTWuWXbrvQTh/O+ztyWeKCy/DLrPHA4NSlxq5n5K8czvoqOTUg9kpR9+qSZmXlkVKzmXqjlTodc2ldfXbpje6JSqRSLxRYWFprN9v79++xfro2NTea500udRK/Nt532Uv65fN0WX29om8GEBCGory5dHxbBvp+GhoYSiUSTEAgErCGXy9eHRRQU5b1u+W+UCnq/lRcUYRi0zMWroCjvOQOWuXgxzIweQb9mdqO/AAbcJzu9/py2AAAAAElFTkSuQmCC" /></a></div></div></td></tr><tr valign="top"><td class="serviceOK">[OK] step "Calculation_(case2)" ran in 7.03s - ok</td></tr><tr valign="top"><td class="serviceOK">[OK] step "Editor_(case2)" ran in 1.39s - ok</td></tr></table>|suite_example_xfce=0;;;; graph_type_case=0;;;; c_001__state=2;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case2=U;20;30;; s_001_001_Test_Sahi_landing_page_(case2)=U;5;;; s_001_002_Calculation_(case2)=7.03s;10;;; s_001_003_Editor_(case2)=1.39s;10;;; [check_sakuli]`);
        })
    })
});

describe('step templates', () => {
    let ctx: TestExecutionContext;
    let renderer: OmdTestResultOutputBuilder;

    beforeEach(() => {
        ctx = new TestExecutionContext(new SimpleLogger);
        renderer = new OmdTestResultOutputBuilder();
    });

    describe.each(Object.entries(TestSteps))('for %s', (key: string, testContextEntity: TestContextEntity) => {

        let properties: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                nagiosHost: 'my.nagios.host',
                serviceType: 'passive',
                nagiosServiceDescription: "example_xfce",
                nagiosCheckCommand: "check_sakuli",
                outputDetails: true
            };
            expected = readFileSync(join(__dirname, '__snapshots__', 'steps', key + '.txt')).toString();
        });

        it('should match static file', () => {
            const rendered = renderer.render(testContextEntity, {
                currentSuite: TestSuite_OK as TestSuiteContext,
                currentCase: TestCase_CRITICAL_IN_STEP as TestCaseContext,
                props: properties
            });
            expect(rendered).toEqual(expected)
        })
    });

    describe('render error', () => {

        let properties: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                nagiosHost: 'my.nagios.host',
                serviceType: 'passive',
                nagiosServiceDescription: "example_xfce",
                nagiosCheckCommand: "check_sakuli",
                outputDetails: true
            };
            expected = readFileSync(join(__dirname, '__snapshots__', 'steps', 'TestStep_ERRORS' + '.txt')).toString();
        });

        it('should match static file', () => {
            const rendered = renderer.render(TestCase_ERRORS, {
                currentSuite: TestSuite_ERRORS as TestSuiteContext,
                currentCase: TestCase_ERRORS as TestCaseContext,
                props: properties
            });
            expect(rendered).toContain(`type=passive
host_name=my.nagios.host
start_time=34570.000
finish_time=34583.550
return_code=2
service_description=example_xfce_case2
output=Case "case2" of Sakuli suite "example_xfce" (13.55s) EXCEPTION: STEP "Test_Sahi_landing_page_(case2)": _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.c...\\n<style>.modalDialog {width: 640px;}.modalDialog:target {width: auto;margin: 20px auto;overflow: scroll;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999;opacity: 1;pointer-events: auto;}.modalDialog:target .close {display: block;}.modalDialog:target .screenshot {width: 100%;border: 2px solid #333;}.screenshot {width: 98%;border: 2px solid  gray;display: block;margin-left: auto;margin-right: auto;margin-bottom: 4px;cursor: -webkit-zoom-in;cursor: -moz-zoom-in;}.close {display: none;background: #aaa;color: #fff;line-height: 25px;position: absolute;right: 10px;text-align: center;top: 25px;width: 65px;text-decoration: none;font-weight: bold;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;}.close:hover {background: #333;}</style><table style="border-collapse: collapse;"><tr valign="top"><td class="serviceCRITICAL">[CRIT] Case "case2" of Sakuli suite "example_xfce" (13.55s) EXCEPTION: . . (Last suite run: 01.01.70 10:36:23)</td></tr><tr valign="top"><td class="serviceCRITICAL">[CRIT] step "Test_Sahi_landing_page_(case2)" EXCEPTION: _highlight(_link("xSL Manager")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>`);
            expect(rendered).toContain(`<a href="#close" title="Close" class="close">Close X</a><a href="#openModal"><img class="screenshot" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAQCAIAAAA3TN7NAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAABPdJREFUSInllX9MU1cUx89997YIVGgV2bIhAwXJWBSxAwRECuPHQAGVkMkQM4W5AYpMxR/RwRSjcYrBwVRANjEiDAY4lOAQg4zfY7gtGDPZ1HT8UIHSlgJiLO3+eOxSaAvG4bJk39w05577Oefec997p+jW3U74f4ioVGoAaG2qetT1YFracoH9Ykf3l3+qlyIyqlIBoEddD/x93rW1tZsClUj68gvz7B3cANRai0iXUxvQxKYNmSL8BWKBKEdVrMPW1s43ImOKiBv58QCgHB197j3+WyIq9VipXC4XAFydFqkmEgyACqC5pZ2dUl5bneIHOafTbv/aijFxcvXYHLtdMMfsJZ1bU0Gewis1rdNijFoNajUAgFKpBACGYIIxxpgQzBBMCAME9/YP0gCW1x6PH3bvS/jI2W1lbnFldn6Zg9A5Oz1VHzyzY4pTaQ4GIUAIAEClUgEAYjAiDEMwwgzGGGHyZ1f/4/5hWirLa4/83Kygde8FhIQaGRvNNjHxCQjanXyUXVIMyD/dGRPq55q0K3ZQIWedwSLh1ZKCyDU+G9f6/lhfU/btpQ0h3pFrfBpqqijQ+MON8NWi3XEfyKQS6qQ7snawSAgAwSIhOx0eUhzaGx/q55qcGPdkeJCSdTcrmUlPGROMMcEY9fYPi7v629ofDo6MEg6hd6FPt5obvf1X61zKzfzCQej8TXnNEse3L2SPt4O+nsdZly5Hxe04nrL/XvtvZy+Wbvp4+7kvT1Kg7ZfW3OIK15Xe58+e0rcv++peqWlljdzMdBd3UWFFbWBI2MWcMxSTS6UMgxgGjRfMYKZPNtT2R0+v7MnQUxUmHEww4eBxADE6x4BcajbPXOdSS2PtqpAwA4NZgSFhzXU1dMeo2E94PBMPL7+nI08S9n5maioQ+QZKensosDE6ztDQ2H/V2p+a6qmTpqW2prOp7uYKkQ+XwxW6uDXWVlNgqdCZoImXdPteDwBgwmEbNAJQT+zsk3gq3myTAalUMFdHH5LLpMbGPATA4/HkMhnNwBpcDgcAOISwtlqtpgCPN5v9HVQoJkVNsqkhl8nCg7zGngqDqf8Nq4WEQWNTtgP3irv01DImyk+Sg6NTbXXlmrAI7SUTU/6QYsCUL1AoFKZ8Ps2gmUqnPTI8bGRsrFAMCObMpc5RpZLD4Tx79kyTpIYpn3++sNzAYJb2sQn8DXV0dFzP2zpFkd3d3QAAekp9f9OWPfEfmvAF7p7vPB0Zaait/rmlad/BYwCw3N2zrKRgfWT0d8X5Lu6e4xk0U+my8y9kb4iKuXa1dPmKsah55q9WXbvi4eWblZFKSasFNp0dYgtLKwBw9/T5/urlgODQ3+/eqSgr3rk/heYkCCEAmG/9ZlFJwRR1srKxFyI9pVovXHTo8/ScM6fSjh3kcg3cPLxiEvaw8OaYhCNJiev83d5a4rg/5QTNoJlKp21jZx8e7G29cFHy0TTWuWXbrvQTh/O+ztyWeKCy/DLrPHA4NSlxq5n5K8czvoqOTUg9kpR9+qSZmXlkVKzmXqjlTodc2ldfXbpje6JSqRSLxRYWFprN9v79++xfro2NTea500udRK/Nt532Uv65fN0WX29om8GEBCGory5dHxbBvp+GhoYSiUSTEAgErCGXy9eHRRQU5b1u+W+UCnq/lRcUYRi0zMWroCjvOQOWuXgxzIweQb9mdqO/AAbcJzu9/py2AAAAAElFTkSuQmCC" /></a></div></div></td></tr><tr valign="top"><td class="serviceOK">[OK] step "Calculation_(case2)" ran in 7.03s - ok</td></tr><tr valign="top"><td class="serviceOK">[OK] step "Editor_(case2)" ran in 1.39s - ok</td></tr></table>|suite_example_xfce=0;;;; graph_type_case=0;;;; c_001__state=2;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case2=U;20;30;; s_001_001_Test_Sahi_landing_page_(case2)=U;5;;; s_001_002_Calculation_(case2)=7.03s;10;;; s_001_003_Editor_(case2)=1.39s;10;;; [check_sakuli]`);
        })
    });

    describe('render error without details', () => {

        let properties: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                nagiosHost: 'my.nagios.host',
                serviceType: 'passive',
                nagiosServiceDescription: "example_xfce",
                nagiosCheckCommand: "check_sakuli",
                outputDetails: false
            };
            expected = readFileSync(join(__dirname, '__snapshots__', 'steps', 'TestStep_ERRORS' + '.txt')).toString();
        });

        it('should match static file', () => {
            const rendered = renderer.render(TestCase_ERRORS, {
                currentSuite: TestSuite_ERRORS as TestSuiteContext,
                currentCase: TestCase_ERRORS as TestCaseContext,
                props: properties
            });
            expect(rendered).toContain(`type=passive
host_name=${properties.nagiosHost}
start_time=34570.000
finish_time=34583.550
return_code=2
service_description=example_xfce_case2
output=Case \"case2\" of Sakuli suite \"example_xfce\" (13.55s) EXCEPTION: STEP \"Test_Sahi_landing_page_(case2)\": _highlight(_link(\"xSL Manager\")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.c...|suite_example_xfce=0;;;; graph_type_case=0;;;; c_001__state=2;;;; c_001__warning=20s;;;; c_001__critical=30s;;;; c_001_case2=U;20;30;; s_001_001_Test_Sahi_landing_page_(case2)=U;5;;; s_001_002_Calculation_(case2)=7.03s;10;;; s_001_003_Editor_(case2)=1.39s;10;;; [check_sakuli]`);
            expect(rendered).not.toContain(`<a href="#close" title="Close" class="close">Close X</a><a href="#openModal"><img class="screenshot" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAQCAIAAAA3TN7NAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAABPdJREFUSInllX9MU1cUx89997YIVGgV2bIhAwXJWBSxAwRECuPHQAGVkMkQM4W5AYpMxR/RwRSjcYrBwVRANjEiDAY4lOAQg4zfY7gtGDPZ1HT8UIHSlgJiLO3+eOxSaAvG4bJk39w05577Oefec997p+jW3U74f4ioVGoAaG2qetT1YFracoH9Ykf3l3+qlyIyqlIBoEddD/x93rW1tZsClUj68gvz7B3cANRai0iXUxvQxKYNmSL8BWKBKEdVrMPW1s43ImOKiBv58QCgHB197j3+WyIq9VipXC4XAFydFqkmEgyACqC5pZ2dUl5bneIHOafTbv/aijFxcvXYHLtdMMfsJZ1bU0Gewis1rdNijFoNajUAgFKpBACGYIIxxpgQzBBMCAME9/YP0gCW1x6PH3bvS/jI2W1lbnFldn6Zg9A5Oz1VHzyzY4pTaQ4GIUAIAEClUgEAYjAiDEMwwgzGGGHyZ1f/4/5hWirLa4/83Kygde8FhIQaGRvNNjHxCQjanXyUXVIMyD/dGRPq55q0K3ZQIWedwSLh1ZKCyDU+G9f6/lhfU/btpQ0h3pFrfBpqqijQ+MON8NWi3XEfyKQS6qQ7snawSAgAwSIhOx0eUhzaGx/q55qcGPdkeJCSdTcrmUlPGROMMcEY9fYPi7v629ofDo6MEg6hd6FPt5obvf1X61zKzfzCQej8TXnNEse3L2SPt4O+nsdZly5Hxe04nrL/XvtvZy+Wbvp4+7kvT1Kg7ZfW3OIK15Xe58+e0rcv++peqWlljdzMdBd3UWFFbWBI2MWcMxSTS6UMgxgGjRfMYKZPNtT2R0+v7MnQUxUmHEww4eBxADE6x4BcajbPXOdSS2PtqpAwA4NZgSFhzXU1dMeo2E94PBMPL7+nI08S9n5maioQ+QZKensosDE6ztDQ2H/V2p+a6qmTpqW2prOp7uYKkQ+XwxW6uDXWVlNgqdCZoImXdPteDwBgwmEbNAJQT+zsk3gq3myTAalUMFdHH5LLpMbGPATA4/HkMhnNwBpcDgcAOISwtlqtpgCPN5v9HVQoJkVNsqkhl8nCg7zGngqDqf8Nq4WEQWNTtgP3irv01DImyk+Sg6NTbXXlmrAI7SUTU/6QYsCUL1AoFKZ8Ps2gmUqnPTI8bGRsrFAMCObMpc5RpZLD4Tx79kyTpIYpn3++sNzAYJb2sQn8DXV0dFzP2zpFkd3d3QAAekp9f9OWPfEfmvAF7p7vPB0Zaait/rmlad/BYwCw3N2zrKRgfWT0d8X5Lu6e4xk0U+my8y9kb4iKuXa1dPmKsah55q9WXbvi4eWblZFKSasFNp0dYgtLKwBw9/T5/urlgODQ3+/eqSgr3rk/heYkCCEAmG/9ZlFJwRR1srKxFyI9pVovXHTo8/ScM6fSjh3kcg3cPLxiEvaw8OaYhCNJiev83d5a4rg/5QTNoJlKp21jZx8e7G29cFHy0TTWuWXbrvQTh/O+ztyWeKCy/DLrPHA4NSlxq5n5K8czvoqOTUg9kpR9+qSZmXlkVKzmXqjlTodc2ldfXbpje6JSqRSLxRYWFprN9v79++xfro2NTea500udRK/Nt532Uv65fN0WX29om8GEBCGory5dHxbBvp+GhoYSiUSTEAgErCGXy9eHRRQU5b1u+W+UCnq/lRcUYRi0zMWroCjvOQOWuXgxzIweQb9mdqO/AAbcJzu9/py2AAAAAElFTkSuQmCC" /></a></div></div></td></tr><tr valign="top"><td class="serviceOK">[OK] step "Calculation_(case2)" ran in 7.03s - ok</td></tr><tr valign="top"><td class="serviceOK">[OK] step "Editor_(case2)" ran in 1.39s - ok</td></tr></table>`);
        })
    })
});
