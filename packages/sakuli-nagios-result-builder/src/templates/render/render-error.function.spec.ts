import {renderCaseErrors, renderSuiteErrors} from "./render-error.function";
import {TestSuite_ERRORS} from "../../__mocks__/test-suite-error.entity";
import {TestSuite_OK} from "../../__mocks__/test-suite-ok.entity";
import {TestCase_ERRORS} from "../../__mocks__/test-case-errors.entity";
import {TestCase_OK} from "../../__mocks__/test-case-ok.entity";
import {TestCaseContext, TestSuiteContext} from "@sakuli/core";

describe("renderCaseError", () => {
    it("should render an error if present", () => {
        // GIVEN
        const expected = `STEP "Test_Sahi_landing_page_(case2)": _highlight(_link(\"xSL Manager\")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>`;

        // WHEN
        const result = renderCaseErrors(TestCase_ERRORS as TestCaseContext);

        // THEN
        expect(result).toEqual(expected);
    });

    it("should not render if no error is present", () => {
        // GIVEN
        const expected = ``;

        // WHEN
        const result = renderCaseErrors(TestCase_OK as TestCaseContext);

        // THEN
        expect(result).toEqual(expected);
    });

    it("should only render case entities", () => {
        // GIVEN
        const expected = ``;

        // WHEN
        const result = renderCaseErrors(TestSuite_ERRORS as TestCaseContext);

        // THEN
        expect(result).toEqual(expected);
    });
});

describe("renderSuiteError", () => {
    it("should render an error if present", () => {
        // GIVEN
        const expected = `CASE "case2": STEP "Test_Sahi_landing_page_(case2)": _highlight(_link(\"xSL Manager\")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>`;

        // WHEN
        const result = renderSuiteErrors(TestSuite_ERRORS as TestSuiteContext);

        // THEN
        expect(result).toEqual(expected);
    });

    it("should not render an error if no error is present", () => {
        // GIVEN
        const expected = ``;

        // WHEN
        const result = renderSuiteErrors(TestSuite_OK as TestSuiteContext);

        // THEN
        expect(result).toEqual(expected);
    });

    it("should only render testsuites", () => {
        // GIVEN
        const expected = ``;

        // WHEN
        const result = renderSuiteErrors(TestCase_ERRORS as TestSuiteContext);

        // THEN
        expect(result).toEqual(expected);
    });
});
