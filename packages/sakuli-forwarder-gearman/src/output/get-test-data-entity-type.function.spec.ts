import { getTestDataEntityType } from "./get-test-data-entity-type.function";
import { TestContextEntity } from "@sakuli/core/dist";

describe('get-test-data-entity-type', () => {
    it.each`
        kind       | expected
        ${'suite'} | ${'TestSuite'}
        ${'case'}  | ${'TestCase'}
        ${'step'}  | ${'TestCaseStep'}
    `(`should map entity of kind $kind to $expected`, ({ kind, expected }) => {
        const entity = new (class extends TestContextEntity {
            public kind = kind;
            getChildren() {return []}
        })
        console.log(entity.kind);
        expect(getTestDataEntityType(entity)).toEqual(expected);
    })
})
