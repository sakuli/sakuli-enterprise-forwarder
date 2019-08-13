import {createEntity} from "../create-entity.function";
import {TestContextEntity} from "@sakuli/core";

export const TestSuite_WARNING_IN_CASE: TestContextEntity = createEntity('suite', {
    id: 'example_xfce',
    warningTime: 300,
    criticalTime: 400,
    startDate: new Date(1970, 0, 1, 10, 34, 0),
    endDate: new Date(1970, 0, 1, 10, 34, 42, 840)
}, [
    createEntity('case', {
        id: 'case1',
        warningTime: 20,
        criticalTime: 30,
        startDate: new Date(1970, 0, 1, 10, 34, 0),
        endDate: new Date(1970, 0, 1, 10, 34, 14, 30)
    }, [
        createEntity('step', {
            id: 'Test_Sahi_landing_page',
            warningTime: 5,
            startDate: new Date(1970, 0, 1, 10, 34, 0, 10),
            endDate: new Date(1970, 0, 1, 10, 34, 1, 160)
        }),
        createEntity('step', {
            id: 'Calculation',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 34, 0, 20),
            endDate: new Date(1970, 0, 1, 10, 34, 7, 340)
        }),
        createEntity('step', {
            id: 'Editor',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 34, 0, 30),
            endDate: new Date(1970, 0, 1, 10, 34, 1, 460)
        })
    ]),
    createEntity('case', {
        id: 'case2',
        warningTime: 2,
        criticalTime: 30,
        startDate: new Date(1970, 0, 1, 10, 34, 20),
        endDate: new Date(1970, 0, 1, 10, 34, 33, 540)
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
    ]),
]);
