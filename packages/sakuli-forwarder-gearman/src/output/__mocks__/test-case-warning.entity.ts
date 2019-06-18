import { createEntity } from "./create-entity.function";
import { TestContextEntityStates } from "@sakuli/core/dist";

export const TestCase_WARNING = createEntity('case', {
    //state: TestContextEntityStates.WARNING,
    warningTime: 2,
    criticalTime: 30,
    startDate: new Date(1970, 1, 1, 10, 34, 20),
    endDate: new Date(1970, 1, 1, 10, 34, 33, 540),
    id: 'case2',
}, [
        createEntity('step', {
            //state: TestContextEntityStates.OK,
            id: 'Test_Sahi_landing_page_(case2)',
            warningTime: 5,
            startDate: new Date(1970, 1, 1, 10, 34, 0, 10),
            endDate: new Date(1970, 1, 1, 10, 34, 0, 940)
        }),
        createEntity('step', {
            //state: TestContextEntityStates.OK,
            id: 'Calculation_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 1, 1, 10, 34, 0, 20),
            endDate: new Date(1970, 1, 1, 10, 34, 7, 140)
        }),
        createEntity('step', {
            //state: TestContextEntityStates.OK,
            id: 'Editor_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 1, 1, 10, 34, 0, 30),
            endDate: new Date(1970, 1, 1, 10, 34, 1, 390)
        })
    ])
