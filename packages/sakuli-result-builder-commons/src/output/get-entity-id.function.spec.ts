import {TestContextEntity} from "@sakuli/core";
import {
    getEntityId,
    UNKNOWN_ACTION,
    UNKNOWN_CASE,
    UNKNOWN_ENTITY,
    UNKNOWN_STEP,
    UNKNOWN_SUITE
} from "./get-entity-id.function";

describe('get-test-data-entity-type', () => {
    it.each`
        id              | kind       | expected
        ${'test id'}    | ${'suite'} | ${'test_id'}
        ${'test id'}    | ${'case'}  | ${'test_id'}
        ${'test id'}    | ${'step'}  | ${'test_id'}
        ${'test id'}    | ${'action'}  | ${'test_id'}
        ${'test'}       | ${'suite'} | ${'test'}
        ${'test'}       | ${'case'}  | ${'test'}
        ${'test'}       | ${'step'}  | ${'test'}
        ${'test'}       | ${'action'}  | ${'test'}
        ${undefined}    | ${'suite'} | ${UNKNOWN_SUITE}
        ${undefined}    | ${'case'}  | ${UNKNOWN_CASE}
        ${undefined}    | ${'step'}  | ${UNKNOWN_STEP}
        ${undefined}    | ${'action'}  | ${UNKNOWN_ACTION}
        ${'test'}       | ${undefined}  | ${UNKNOWN_ENTITY}
    `(`should map entity of kind $kind to $expected`, ({id, kind, expected}) => {
        const entity = new (class extends TestContextEntity {
            public id = id;
            public kind = kind;

            getChildren() {
                return []
            }
        });
        expect(getEntityId(entity)).toEqual(expected);
    });

    it("should default to UNKNOWN_ENTITY", () => {
        expect(getEntityId(undefined)).toEqual(UNKNOWN_ENTITY);
    });
});
