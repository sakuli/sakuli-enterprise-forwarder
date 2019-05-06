import { convertToUnixTimestamp } from "./convert-to-unix-timestamp.function";
import { format } from "./format.function";
import { isBlank } from "./is-blank.function";

describe('is-blank', () => {
    it.each`
        text       | expected
        ${''}      | ${true}
        ${'     '} | ${true}
        ${'1'}     | ${false}
    `(`should detect $value tobe empty=$expected`, ({ text, expected}) => {
        expect(isBlank.callable(text)).toEqual(expected);        
    }) 
})