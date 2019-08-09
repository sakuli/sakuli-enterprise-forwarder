import {createEntity} from "@sakuli/result-builder-commons";
import {TestContextEntity} from "@sakuli/core";

export const TestCase_OK: TestContextEntity = createEntity('case', {
    warningTime: 20,
    criticalTime: 30,
    startDate: new Date(1970, 0, 1, 10, 30, 0),
    endDate: new Date(1970, 0, 1, 10, 30, 14, 20),
    id: 'case1'
}, [
    createEntity('step', {
        id: 'Test_Sahi_landing_page',
        warningTime: 5,
        startDate: new Date(1970, 0, 1, 10, 30, 0),
        endDate: new Date(1970, 0, 1, 10, 30, 1, 160)
    }),
    createEntity('step', {
        id: 'Calculation',
        warningTime: 10,
        startDate: new Date(1970, 0, 1, 10, 30, 0, 10),
        endDate: new Date(1970, 0, 1, 10, 30, 7, 290)
    }),
    createEntity('step', {
        id: 'Editor',
        warningTime: 10,
        startDate: new Date(1970, 0, 1, 10, 30, 0, 20),
        endDate: new Date(1970, 0, 1, 10, 30, 1, 500)
    })
]);
