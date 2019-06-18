import { createEntity } from "./__mocks__/create-entity.function";
import { ParentMap, createParentMap } from "./create-parent-map.function";

describe('create-parent-map', () => {

    const step1 = createEntity('step', {id: 'step'})
    const case1 = createEntity('case', { id: 'case-1' })
    const case2 = createEntity('case', { id: 'case-2' }, [step1])
    const suite = createEntity('suite', { id: 'suite' }, [case1, case2])
    let map: ParentMap;
    beforeEach(() => {
        map = createParentMap(suite);
    });

    it('should associate case1 with suite', () => {
        expect(map.get(case1)).toBe(suite);
    });

    it('should associate case1 with suite', () => {
        expect(map.get(case2)).toBe(suite);
    })

    it('should associate step with case2', () => {
        expect(map.get(step1)).toBe(case2);
    })

});
