import {readFileSync} from 'fs';
import {join} from "path";
import {TestCaseContext, TestContextEntity, TestExecutionContext, TestSuiteContext} from "@sakuli/core";
import {SimpleLogger} from "@sakuli/commons";
import {TestSuites} from './__mocks__';
import {CheckMkTestResultOutputBuilder} from "./index";
import {TestSuite_OK} from "./__mocks__/test-suite-ok.entity";
import {TestCase_OK} from "./__mocks__/test-case-ok.entity";
import {TestSuite_ERRORS} from "./__mocks__/test-suite-error.entity";

describe('suite templates', () => {
    let ctx: TestExecutionContext;
    let renderer: CheckMkTestResultOutputBuilder;

    beforeEach(() => {
        ctx = new TestExecutionContext(new SimpleLogger);
        renderer = new CheckMkTestResultOutputBuilder();
    });

    describe.each(Object.entries(TestSuites))('for %s', (key: string, testContextEntity: TestContextEntity) => {
        let properties: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                serviceDescription: "service_description",
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
                serviceDescription: "service_description",
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
            expect(rendered).toContain(`<<<local>>>
2 service_description suite__state=2;;;;|suite__warning=300s;;;;|suite__critical=400s;;;;|suite_example_xfce=U;300;400;;|c_001__state=0;;;;|c_001__warning=20s;;;;|c_001__critical=30s;;;;|c_001_case1=14.20s;20;30;;|s_001_001_Test_Sahi_landing_page=1.14s;5;;;|s_001_002_Calculation=7.53s;10;;;|s_001_003_Editor=1.45s;10;;;|c_002__state=2;;;;|c_002__warning=20s;;;;|c_002__critical=30s;;;;|c_002_case2=U;20;30;;|s_002_001_Test_Sahi_landing_page_(case2)=U;5;;;|s_002_002_Calculation_(case2)=7.03s;10;;;|s_002_003_Editor_(case2)=1.39s;10;;; [CRIT] Sakuli suite "example_xfce" (44.80s) EXCEPTION: CASE "case2": STEP "Test_Sahi_landing_page_(case2)`);
            expect(rendered).toContain(`<a href="#close" title="Close" class="close">Close X</a><a href="#openModal"><img class="screenshot" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAQCAIAAAA3TN7NAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAABPdJREFUSInllX9MU1cUx89997YIVGgV2bIhAwXJWBSxAwRECuPHQAGVkMkQM4W5AYpMxR/RwRSjcYrBwVRANjEiDAY4lOAQg4zfY7gtGDPZ1HT8UIHSlgJiLO3+eOxSaAvG4bJk39w05577Oefec997p+jW3U74f4ioVGoAaG2qetT1YFracoH9Ykf3l3+qlyIyqlIBoEddD/x93rW1tZsClUj68gvz7B3cANRai0iXUxvQxKYNmSL8BWKBKEdVrMPW1s43ImOKiBv58QCgHB197j3+WyIq9VipXC4XAFydFqkmEgyACqC5pZ2dUl5bneIHOafTbv/aijFxcvXYHLtdMMfsJZ1bU0Gewis1rdNijFoNajUAgFKpBACGYIIxxpgQzBBMCAME9/YP0gCW1x6PH3bvS/jI2W1lbnFldn6Zg9A5Oz1VHzyzY4pTaQ4GIUAIAEClUgEAYjAiDEMwwgzGGGHyZ1f/4/5hWirLa4/83Kygde8FhIQaGRvNNjHxCQjanXyUXVIMyD/dGRPq55q0K3ZQIWedwSLh1ZKCyDU+G9f6/lhfU/btpQ0h3pFrfBpqqijQ+MON8NWi3XEfyKQS6qQ7snawSAgAwSIhOx0eUhzaGx/q55qcGPdkeJCSdTcrmUlPGROMMcEY9fYPi7v629ofDo6MEg6hd6FPt5obvf1X61zKzfzCQej8TXnNEse3L2SPt4O+nsdZly5Hxe04nrL/XvtvZy+Wbvp4+7kvT1Kg7ZfW3OIK15Xe58+e0rcv++peqWlljdzMdBd3UWFFbWBI2MWcMxSTS6UMgxgGjRfMYKZPNtT2R0+v7MnQUxUmHEww4eBxADE6x4BcajbPXOdSS2PtqpAwA4NZgSFhzXU1dMeo2E94PBMPL7+nI08S9n5maioQ+QZKensosDE6ztDQ2H/V2p+a6qmTpqW2prOp7uYKkQ+XwxW6uDXWVlNgqdCZoImXdPteDwBgwmEbNAJQT+zsk3gq3myTAalUMFdHH5LLpMbGPATA4/HkMhnNwBpcDgcAOISwtlqtpgCPN5v9HVQoJkVNsqkhl8nCg7zGngqDqf8Nq4WEQWNTtgP3irv01DImyk+Sg6NTbXXlmrAI7SUTU/6QYsCUL1AoFKZ8Ps2gmUqnPTI8bGRsrFAMCObMpc5RpZLD4Tx79kyTpIYpn3++sNzAYJb2sQn8DXV0dFzP2zpFkd3d3QAAekp9f9OWPfEfmvAF7p7vPB0Zaait/rmlad/BYwCw3N2zrKRgfWT0d8X5Lu6e4xk0U+my8y9kb4iKuXa1dPmKsah55q9WXbvi4eWblZFKSasFNp0dYgtLKwBw9/T5/urlgODQ3+/eqSgr3rk/heYkCCEAmG/9ZlFJwRR1srKxFyI9pVovXHTo8/ScM6fSjh3kcg3cPLxiEvaw8OaYhCNJiev83d5a4rg/5QTNoJlKp21jZx8e7G29cFHy0TTWuWXbrvQTh/O+ztyWeKCy/DLrPHA4NSlxq5n5K8czvoqOTUg9kpR9+qSZmXlkVKzmXqjlTodc2ldfXbpje6JSqRSLxRYWFprN9v79++xfro2NTea500udRK/Nt532Uv65fN0WX29om8GEBCGory5dHxbBvp+GhoYSiUSTEAgErCGXy9eHRRQU5b1u+W+UCnq/lRcUYRi0zMWroCjvOQOWuXgxzIweQb9mdqO/AAbcJzu9/py2AAAAAElFTkSuQmCC" /></a></div></div></td></tr></table>`);
        })
    });

    describe('render error without details', () => {
        let properties: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                serviceDescription: "service_description",
                outputDetails: false
            };
            expected = readFileSync(join(__dirname, '__snapshots__', 'suites', 'TestSuite_ERRORS' + '.txt')).toString();
        });

        it('should match static file', () => {
            const rendered = renderer.render(TestSuite_ERRORS, {
                currentSuite: TestSuite_ERRORS as TestSuiteContext,
                currentCase: undefined,
                props: properties
            });
            expect(rendered).toContain(`<<<local>>>
2 service_description suite__state=2;;;;|suite__warning=300s;;;;|suite__critical=400s;;;;|suite_example_xfce=U;300;400;;|c_001__state=0;;;;|c_001__warning=20s;;;;|c_001__critical=30s;;;;|c_001_case1=14.20s;20;30;;|s_001_001_Test_Sahi_landing_page=1.14s;5;;;|s_001_002_Calculation=7.53s;10;;;|s_001_003_Editor=1.45s;10;;;|c_002__state=2;;;;|c_002__warning=20s;;;;|c_002__critical=30s;;;;|c_002_case2=U;20;30;;|s_002_001_Test_Sahi_landing_page_(case2)=U;5;;;|s_002_002_Calculation_(case2)=7.03s;10;;;|s_002_003_Editor_(case2)=1.39s;10;;; [CRIT] Sakuli suite "example_xfce" (44.80s) EXCEPTION: CASE "case2": STEP "Test_Sahi_landing_page_(case2)`);
            expect(rendered).not.toContain(`<a href="#close" title="Close" class="close">Close X</a><a href="#openModal"><img class="screenshot" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAQCAIAAAA3TN7NAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAABPdJREFUSInllX9MU1cUx89997YIVGgV2bIhAwXJWBSxAwRECuPHQAGVkMkQM4W5AYpMxR/RwRSjcYrBwVRANjEiDAY4lOAQg4zfY7gtGDPZ1HT8UIHSlgJiLO3+eOxSaAvG4bJk39w05577Oefec997p+jW3U74f4ioVGoAaG2qetT1YFracoH9Ykf3l3+qlyIyqlIBoEddD/x93rW1tZsClUj68gvz7B3cANRai0iXUxvQxKYNmSL8BWKBKEdVrMPW1s43ImOKiBv58QCgHB197j3+WyIq9VipXC4XAFydFqkmEgyACqC5pZ2dUl5bneIHOafTbv/aijFxcvXYHLtdMMfsJZ1bU0Gewis1rdNijFoNajUAgFKpBACGYIIxxpgQzBBMCAME9/YP0gCW1x6PH3bvS/jI2W1lbnFldn6Zg9A5Oz1VHzyzY4pTaQ4GIUAIAEClUgEAYjAiDEMwwgzGGGHyZ1f/4/5hWirLa4/83Kygde8FhIQaGRvNNjHxCQjanXyUXVIMyD/dGRPq55q0K3ZQIWedwSLh1ZKCyDU+G9f6/lhfU/btpQ0h3pFrfBpqqijQ+MON8NWi3XEfyKQS6qQ7snawSAgAwSIhOx0eUhzaGx/q55qcGPdkeJCSdTcrmUlPGROMMcEY9fYPi7v629ofDo6MEg6hd6FPt5obvf1X61zKzfzCQej8TXnNEse3L2SPt4O+nsdZly5Hxe04nrL/XvtvZy+Wbvp4+7kvT1Kg7ZfW3OIK15Xe58+e0rcv++peqWlljdzMdBd3UWFFbWBI2MWcMxSTS6UMgxgGjRfMYKZPNtT2R0+v7MnQUxUmHEww4eBxADE6x4BcajbPXOdSS2PtqpAwA4NZgSFhzXU1dMeo2E94PBMPL7+nI08S9n5maioQ+QZKensosDE6ztDQ2H/V2p+a6qmTpqW2prOp7uYKkQ+XwxW6uDXWVlNgqdCZoImXdPteDwBgwmEbNAJQT+zsk3gq3myTAalUMFdHH5LLpMbGPATA4/HkMhnNwBpcDgcAOISwtlqtpgCPN5v9HVQoJkVNsqkhl8nCg7zGngqDqf8Nq4WEQWNTtgP3irv01DImyk+Sg6NTbXXlmrAI7SUTU/6QYsCUL1AoFKZ8Ps2gmUqnPTI8bGRsrFAMCObMpc5RpZLD4Tx79kyTpIYpn3++sNzAYJb2sQn8DXV0dFzP2zpFkd3d3QAAekp9f9OWPfEfmvAF7p7vPB0Zaait/rmlad/BYwCw3N2zrKRgfWT0d8X5Lu6e4xk0U+my8y9kb4iKuXa1dPmKsah55q9WXbvi4eWblZFKSasFNp0dYgtLKwBw9/T5/urlgODQ3+/eqSgr3rk/heYkCCEAmG/9ZlFJwRR1srKxFyI9pVovXHTo8/ScM6fSjh3kcg3cPLxiEvaw8OaYhCNJiev83d5a4rg/5QTNoJlKp21jZx8e7G29cFHy0TTWuWXbrvQTh/O+ztyWeKCy/DLrPHA4NSlxq5n5K8czvoqOTUg9kpR9+qSZmXlkVKzmXqjlTodc2ldfXbpje6JSqRSLxRYWFprN9v79++xfro2NTea500udRK/Nt532Uv65fN0WX29om8GEBCGory5dHxbBvp+GhoYSiUSTEAgErCGXy9eHRRQU5b1u+W+UCnq/lRcUYRi0zMWroCjvOQOWuXgxzIweQb9mdqO/AAbcJzu9/py2AAAAAElFTkSuQmCC" /></a></div></div></td></tr></table>`);
        })
    })
});
