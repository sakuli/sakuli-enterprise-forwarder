import {createEntity} from "./create-entity.function";
import {TestContextEntityStates} from "@sakuli/core";

export const TestCase_WARNING_IN_STEP = createEntity('case', {
    //state: TestContextEntityStates.WARNING,
    warningTime: 20,
    criticalTime: 30,
    startDate: new Date(1970, 0, 1, 10, 31, 20),
    endDate: new Date(1970, 0, 1, 10, 31, 33, 430),
    id: 'case2'
}, [
    createEntity('step', {
        //state: TestContextEntityStates.OK,
        id: 'Test_Sahi_landing_page_(case2)',
        warningTime: 5,
        startDate: new Date(1970, 0, 1, 10, 31, 0, 10),
        endDate: new Date(1970, 0, 1, 10, 31, 0, 930)
    }),
    createEntity('step', {
        //state: TestContextEntityStates.WARNING,
        id: 'Calculation_(case2)',
        warningTime: 1,
        startDate: new Date(1970, 0, 1, 10, 31, 0, 20),
        endDate: new Date(1970, 0, 1, 10, 31, 7, 20)
    }),
    createEntity('step', {
        //state: TestContextEntityStates.OK,
        id: 'Editor_(case2)',
        warningTime: 10,
        startDate: new Date(1970, 0, 1, 10, 31, 0, 30),
        endDate: new Date(1970, 0, 1, 10, 31, 1, 420)
    })
]);
