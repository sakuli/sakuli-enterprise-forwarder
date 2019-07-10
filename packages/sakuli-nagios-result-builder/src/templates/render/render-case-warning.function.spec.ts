import {TestCase_WARNING} from "../../__mocks__/test-case-warning.entity";
import {TestCase_CRITICAL} from "../../__mocks__/test-case-critical.entity";
import {renderCaseWarning} from "./render-case-warning.function";
import {TestCaseContext} from "@sakuli/core";

describe("render-case-warning", () => {
    it("should output cases in warning state", () => {
        // GIVEN
        const expected = `, case "case2" over runtime (13.54s/warn at 2s)`;

        // WHEN
        const result = renderCaseWarning(TestCase_WARNING as TestCaseContext);

        // THEN
        expect(result).toEqual(expected);
    });

    it("should not output cases in other state than warning", () => {
        // GIVEN
        const expected = ``;

        // WHEN
        const result = renderCaseWarning(TestCase_CRITICAL as TestCaseContext);

        // THEN
        expect(result).toEqual(expected);
    });
});