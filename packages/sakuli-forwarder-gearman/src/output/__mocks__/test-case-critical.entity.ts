import { createEntity } from "./create-entity.function";
import { TestContextEntityStates } from "@sakuli/core/dist";

export const TestCase_CRITICAL = createEntity('case', {
    //state: TestContextEntityStates.CRITICAL,
    warningTime: 2,
    criticalTime: 3,
    startDate: new Date(1970, 1, 1, 10, 35, 20),
    endDate: new Date(1970, 1, 1, 10, 35, 33, 700)
}, [
        createEntity('step', {
            //state: TestContextEntityStates.OK,
            id: 'Test_Sahi_landing_page_(case2)',
            warningTime: 5,
            startDate: new Date(1970, 1, 1, 10, 35, 0),
            endDate: new Date(1970, 1, 1, 10, 35, 1, 80)
        }),
        createEntity('step', {
            //state: TestContextEntityStates.OK,
            id: 'Calculation_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 1, 1, 10, 35, 0, 10),
            endDate: new Date(1970, 1, 1, 10, 35, 7, 120)
        }),
        createEntity('step', {
            //state: TestContextEntityStates.OK,
            id: 'Editor_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 1, 1, 10, 35, 0, 20),
            endDate: new Date(1970, 1, 1, 10, 35, 1, 440)
        })
    ])
