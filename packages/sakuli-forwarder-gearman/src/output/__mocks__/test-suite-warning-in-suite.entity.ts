import {createEntity} from "./create-entity.function";

export const TestSuite_WARNING_IN_SUITE = createEntity('suite', {
    id: 'example_xfce',
    warningTime: 3,
    criticalTime: 400,
    startDate: new Date(1970, 0, 1, 10, 32, 0),
    endDate: new Date(1970, 0, 1, 10, 32, 46, 940)
}, [
    createEntity('case', {
        id: 'case1',
        warningTime: 20,
        criticalTime: 30,
        startDate: new Date(1970, 0, 1, 10, 32, 0),
        endDate: new Date(1970, 0, 1, 10, 32, 14, 130)
    }, [
        createEntity('step', {
            id: 'Test_Sahi_landing_page',
            warningTime: 5,
            startDate: new Date(1970, 0, 1, 10, 32, 0),
            endDate: new Date(1970, 0, 1, 10, 32, 1, 210)
        }),
        createEntity('step', {
            id: 'Calculation',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 32, 0, 10),
            endDate: new Date(1970, 0, 1, 10, 32, 7, 410)
        }),
        createEntity('step', {
            id: 'Editor',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 32, 0, 20),
            endDate: new Date(1970, 0, 1, 10, 32, 1, 430)
        })
    ]),
    createEntity('case', {
        id: 'case2',
        warningTime: 2,
        criticalTime: 3,
        startDate: new Date(1970, 0, 1, 10, 32, 10),
        endDate: new Date(1970, 0, 1, 10, 32, 23, 580)
    }, [
        createEntity('step', {
            id: 'Test_Sahi_landing_page_(case2)',
            warningTime: 5,
            startDate: new Date(1970, 0, 1, 10, 32, 0),
            endDate: new Date(1970, 0, 1, 10, 32, 1, 60)
        }),
        createEntity('step', {
            id: 'Calculation_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 32, 0, 10),
            endDate: new Date(1970, 0, 1, 10, 32, 7, 80)
        }),
        createEntity('step', {
            id: 'Editor_(case2)',
            warningTime: 10,
            startDate: new Date(1970, 0, 1, 10, 32, 0, 20),
            endDate: new Date(1970, 0, 1, 10, 32, 1, 360)
        })
    ]),
]);
