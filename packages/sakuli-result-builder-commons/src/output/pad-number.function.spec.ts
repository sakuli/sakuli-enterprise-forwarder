import {padNumberWithZeros} from "./pad-number.function";

describe("padNumberWithZeros", () => {
    it.each(<[number, number, string][]>[
        [1, 4, "0001"],
        [10, 4, "0010"],
        [100, 4, "0100"],
        [1000, 4, "1000"],
    ])("should pad a number with zeros to specified total length", (input: number, length: number, expected: string) => {
        // GIVEN

        // WHEN
        const result = padNumberWithZeros(input, length);

        // THEN
        expect(result).toEqual(expected);
    });
});