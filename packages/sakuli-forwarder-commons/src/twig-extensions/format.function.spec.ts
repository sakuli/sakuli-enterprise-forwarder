import { convertToUnixTimestamp } from "./convert-to-unix-timestamp.function";
import { format } from "./format.function";

describe('format', () => {
    it.each`
        text | args         | expected
        ${'%s World'} | ${['Hello']} | ${'Hello World'}
    `(`should detect $value tobe empty=$expected`, ({ text, args, expected}) => {
        expect(format.callable(text, ...args)).toEqual(expected);        
    }) 
})