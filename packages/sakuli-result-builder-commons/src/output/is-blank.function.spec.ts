import {isBlank} from "./is-blank.function";

describe('is-blank', () => {
    it.each`
        text       | expected
        ${''}      | ${true}
        ${'     '} | ${true}
        ${'1'}     | ${false}
    `(`should detect $value tobe empty=$expected`, ({text, expected}) => {
        expect(isBlank(text)).toEqual(expected);
    })
});