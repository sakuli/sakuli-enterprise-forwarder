import {createEntity} from "../create-entity.function";
import {TestContextEntity} from "@sakuli/core";

export const TestCase_WARNING: TestContextEntity = createEntity('case', {
    warningTime: 2,
    criticalTime: 30,
    startDate: new Date(1970, 0, 1, 10, 34, 20),
    endDate: new Date(1970, 0, 1, 10, 34, 33, 540),
    id: 'case2',
}, [
    createEntity('step', {
        id: 'Test_Sahi_landing_page_(case2)',
        warningTime: 5,
        startDate: new Date(1970, 0, 1, 10, 34, 0, 10),
        endDate: new Date(1970, 0, 1, 10, 34, 0, 940)
    }),
    createEntity('step', {
        id: 'Calculation_(case2)',
        warningTime: 10,
        startDate: new Date(1970, 0, 1, 10, 34, 0, 20),
        endDate: new Date(1970, 0, 1, 10, 34, 7, 140)
    }),
    createEntity('step', {
        id: 'Editor_(case2)',
        warningTime: 10,
        startDate: new Date(1970, 0, 1, 10, 34, 0, 30),
        endDate: new Date(1970, 0, 1, 10, 34, 1, 390)
    })
]);
