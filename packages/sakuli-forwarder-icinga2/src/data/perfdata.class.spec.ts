import { fromEntity, toString } from "./perfdata.class";
import { createEntity } from "../../../sakuli-result-builder-commons/dist";

describe('PerfData', () => {

    it('create PerfData from Entity', () => {
        const perf = fromEntity(createEntity('case', {
            warningTime: 20,
            criticalTime: 30,
            id: 'Case1',
            startDate: new Date(2000, 1,1,0,0,0,0),
            endDate: new Date(2000, 1,1,0,0,1,0),
        }))

        expect(perf.criticalTime).toBe(30)
        expect(perf.warningTime).toBe(20)
        expect(perf.value).toBeCloseTo(1)
    })

    it('to String from Entity', () => {
        const perf = fromEntity(createEntity('case', {
            warningTime: 20,
            criticalTime: 30,
            id: 'Case1',
            startDate: new Date(2000, 1,1,0,0,0,0),
            endDate: new Date(2000, 1,1,0,0,1,0),
        }))

        expect(toString(perf)).toBe(`'case Case1'=1s;20;30;;`);
    })

})
