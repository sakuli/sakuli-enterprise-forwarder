import {empty} from "./empty.function";

describe('empty', () => {
    it.each`
        value          | expected
        ${null}        | ${true}
        ${undefined}   | ${true}
        ${[]}          | ${true}
        ${[1]}         | ${false}
    `(`should detect $value tobe empty=$expected`, ({value, expected}) => {
        expect(empty(value)).toEqual(expected);
    })
});