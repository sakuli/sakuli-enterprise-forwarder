import {createEntity} from "../create-entity.function";
import {TestContextEntity} from "@sakuli/core";

export const TestSuite_CRITICAL_IN_SUITE: TestContextEntity = createEntity('suite', {
    id: 'example_xfce',
    warningTime: 30,
    criticalTime: 40,
    startDate: new Date(1970, 0, 1, 10, 33, 0),
    endDate: new Date(1970, 0, 1, 10, 33, 44, 810)
}, [
    createEntity('case', {
        id: 'case1',
        warningTime: 20,
        criticalTime: 30,
        startDate: new Date(1970, 0, 1, 10, 33, 0),
        endDate: new Date(1970, 0, 1, 10, 33, 13, 910)
    }, [
        createEntity('step', {
            id: 'Test_Sahi_landing_page',
            warningTime: 5,
            startDate: new Date(1970, 0, 1, 10, 33, 0),
            endDate: new Date(1970, 0, 1, 10, 33, 1, 160)
        }),
        createEntity('step', {
            id: 'Calculation',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 33, 0, 10),
            endDate: new Date(1970, 0, 1, 10, 33, 7, 250)
        }),
        createEntity('step', {
            id: 'Editor',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 33, 0, 20),
            endDate: new Date(1970, 0, 1, 10, 33, 1, 450)
        })
    ]),
    createEntity('case', {
        id: 'case2',
        warningTime: 20,
        criticalTime: 30,
        startDate: new Date(1970, 0, 1, 10, 33, 10),
        endDate: new Date(1970, 0, 1, 10, 33, 23, 550)
    }, [
        createEntity('step', {
            id: 'Test_Sahi_landing_page_(case2)',
            warningTime: 5,
            startDate: new Date(1970, 0, 1, 10, 33, 0),
            endDate: new Date(1970, 0, 1, 10, 33, 1, 50)
        }),
        createEntity('step', {
            id: 'Calculation_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 33, 10),
            endDate: new Date(1970, 0, 1, 10, 33, 17, 30)
        }),
        createEntity('step', {
            id: 'Editor_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 33, 20),
            endDate: new Date(1970, 0, 1, 10, 33, 21, 390)
        })
    ]),
]);
