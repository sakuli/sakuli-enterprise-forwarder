import { convertToUnixTimestamp } from "./convert-to-unix-timestamp.function";

describe('convert-to-timestamp', () => {
    it.each`
        inputDate               | expectedString
        ${new Date(1519377570)} | ${'1519377.570'}
        ${new Date(1519377000)} | ${'1519377.000'}
        ${new Date(1519000000)} | ${'1519000.000'}
        ${new Date(1519377999)} | ${'1519377.999'}
        ${null}                 | ${'-1'}
    `(`should convert $inputDate to $expectedDate`, ({ inputDate, expectedString }) => {
        const unixTimestamp = convertToUnixTimestamp(inputDate);
        expect(unixTimestamp).toEqual(expectedString);
    })
});
