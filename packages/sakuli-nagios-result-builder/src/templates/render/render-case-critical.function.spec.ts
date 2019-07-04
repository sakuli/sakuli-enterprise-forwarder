import {renderCaseCritical} from "./render-case-critical.function";
import {TestCase_CRITICAL} from "../../__mocks__/test-case-critical.entity";
import {TestCase_WARNING} from "../../__mocks__/test-case-warning.entity";
import {TestCaseContext} from "@sakuli/core";

describe("render-case-critical", () => {
    it("should output cases in critical state", () => {
        // GIVEN
        const expected = `, case "case2" over runtime (13.70s/crit at 3s)`;

        // WHEN
        const result = renderCaseCritical(TestCase_CRITICAL as TestCaseContext);

        // THEN
        expect(result).toEqual(expected);
    });

    it("should not output cases in other state than critical", () => {
        // GIVEN
        const expected = ``;

        // WHEN
        const result = renderCaseCritical(TestCase_WARNING as TestCaseContext);

        // THEN
        expect(result).toEqual(expected);
    });
});