import { abbreviate } from "./abbreviate.function";

describe('abbreviate', () => {

    it.each`
        input | maxLen | escape | expected
        ${null} | ${1} | ${true} | ${null}
        ${null} | ${1} | ${false} | ${null}
        ${'  '} | ${4} | ${false} | ${'  '}
        ${'  '} | ${4} | ${true} | ${''}
        ${'abcdefg'} | ${6} | ${false} | ${'abc...'}
        ${'abcdefg'} | ${7} | ${false} | ${'abcdefg'}
        ${'abcdefg'} | ${8} | ${false} | ${'abcdefg'}
        ${'abcdefg'} | ${4} | ${false} | ${'a...'}
        ${'   abc '} | ${4} | ${true} | ${'abc '}
        ${'       abc '} | ${4} | ${true} | ${'abc '}
        ${'\t\t\t\n\nabc '} | ${4} | ${true} | ${'abc '}
        ${'   abc  '} | ${4} | ${true} | ${'a...'}
        ${'   abc  '} | ${7} | ${false} | ${'   a...'}
        ${'   abc  '} | ${7} | ${null} | ${'   a...'}
    `(`should abbreviate '$input' with max length of $maxLen and escaping $escape to '$expected'`, ({input, maxLen, escape, expected}) => {
        expect(abbreviate.callable(input, maxLen, escape)).toEqual(expected);
    })


})