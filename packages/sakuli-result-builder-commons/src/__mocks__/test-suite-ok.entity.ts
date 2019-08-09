import {createEntity} from "../create-entity.function";
import {TestContextEntity} from "@sakuli/core";

export const TestSuite_OK: TestContextEntity = createEntity('suite', {
    id: 'example_xfce',
    warningTime: 300,
    criticalTime: 400,
    startDate: new Date(1970, 0, 1, 10, 30, 0, 0),
    endDate: new Date(1970, 0, 1, 10, 30, 44, 990)
}, [
    createEntity('case', {
        id: 'case1',
        warningTime: 20,
        criticalTime: 30,
        startDate: new Date(1970, 0, 1, 10, 30, 0),
        endDate: new Date(1970, 0, 1, 10, 30, 14, 20)
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
    ]),
    createEntity('case', {
        id: 'case2',
        warningTime: 20,
        criticalTime: 30,
        startDate: new Date(1970, 0, 1, 10, 30, 0),
        endDate: new Date(1970, 0, 1, 10, 30, 13, 580)
    }, [
        createEntity('step', {
            id: 'Test_Sahi_landing_page_(case2)',
            warningTime: 5,
            startDate: new Date(1970, 0, 1, 10, 30, 0),
            endDate: new Date(1970, 0, 1, 10, 30, 1, 30)
        }),
        createEntity('step', {
            id: 'Calculation_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 30, 0, 10),
            endDate: new Date(1970, 0, 1, 10, 30, 7, 80)
        }),
        createEntity('step', {
            id: 'Editor_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 30, 0, 20),
            endDate: new Date(1970, 0, 1, 10, 30, 1, 390)
        })
    ]),
]);
