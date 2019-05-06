import { getTestDataEntityType } from "./get-test-data-entity-type.function";

describe('get-test-data-entity-type', () => {
    it.each`
        kind       | expected
        ${'suite'} | ${'TestSuite'}
        ${'case'}  | ${'TestCase'}
        ${'step'}  | ${'TestCaseStep'}
    `(`should map entity of kind $kind to $expected`, ({kind, expected}) => {
        expect(getTestDataEntityType.callable({kind})).toEqual(expected);
    })
})