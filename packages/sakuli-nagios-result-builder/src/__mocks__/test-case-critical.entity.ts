import {createEntity} from "@sakuli/result-builder-commons";
import {TestContextEntity} from "@sakuli/core";

export const TestCase_CRITICAL: TestContextEntity = createEntity('case', {
    id: 'case2',
    warningTime: 2,
    criticalTime: 3,
    startDate: new Date(1970, 0, 1, 10, 35, 20),
    endDate: new Date(1970, 0, 1, 10, 35, 33, 700)
}, [
    createEntity('step', {
        id: 'Test_Sahi_landing_page_(case2)',
        warningTime: 5,
        startDate: new Date(1970, 0, 1, 10, 35, 0),
        endDate: new Date(1970, 0, 1, 10, 35, 1, 80)
    }),
    createEntity('step', {
        id: 'Calculation_(case2)',
        warningTime: 10,
        startDate: new Date(1970, 0, 1, 10, 35, 0, 10),
        endDate: new Date(1970, 0, 1, 10, 35, 7, 120)
    }),
    createEntity('step', {
        id: 'Editor_(case2)',
        warningTime: 10,
        startDate: new Date(1970, 0, 1, 10, 35, 0, 20),
        endDate: new Date(1970, 0, 1, 10, 35, 1, 440)
    })
]);
