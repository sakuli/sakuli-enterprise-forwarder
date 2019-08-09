import {replaceWhitespaces} from "./replace-whitespace.function";

describe("whitespaces", () => {
    it("should be replaced with '_'", () => {
        // GIVEN
        const input = "text with whitespaces";
        const expected = "text_with_whitespaces";

        // WHEN
        const result = replaceWhitespaces(input, "_");

        // THEN
        expect(result).toBe(expected);
    });

    it("should be replaced or skipped", () => {
        // GIVEN
        const input = "text with whitespaces";
        const expected = "textwithwhitespaces";

        // WHEN
        const result = replaceWhitespaces(input, " ");

        // THEN
        expect(result).toBe(expected);
    });
});