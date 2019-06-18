import { createEntity } from "./create-entity.function";

export const TestSuite_WARNING_IN_STEP = createEntity('suite', {
    id: 'example_xfce',
    warningTime: 300,
    criticalTime: 400,
    startDate: new Date(1970, 1, 1, 10, 31, 0),
    endDate: new Date(1970, 1, 1, 10, 31, 44, 750)
}, [
        createEntity('case', {
            id: 'case1',
            warningTime: 20,
            criticalTime: 30,
            startDate: new Date(1970, 1, 1, 10, 31, 0),
            endDate: new Date(1970, 1, 1, 10, 31, 13, 830)
        }, [
                createEntity('step', {
                    id: 'Test_Sahi_landing_page',
                    warningTime: 5,
                    startDate: new Date(1970, 1, 1, 10, 31, 0),
                    endDate: new Date(1970, 1, 1, 10, 31, 1, 80)
                }),
                createEntity('step', {
                    id: 'Calculation',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 31, 0, 10),
                    endDate: new Date(1970, 1, 1, 10, 31, 7, 140)
                }),
                createEntity('step', {
                    id: 'Editor',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 31, 0, 20),
                    endDate: new Date(1970, 1, 1, 10, 31, 1, 550)
                })
            ]),
        createEntity('case', {
            id: 'case2',
            warningTime: 20,
            criticalTime: 30,
            startDate: new Date(1970, 1, 1, 10, 31, 20),
            endDate: new Date(1970, 1, 1, 10, 31, 33, 430)
        }, [
                createEntity('step', {
                    id: 'Test_Sahi_landing_page_(case2)',
                    warningTime: 5,
                    startDate: new Date(1970, 1, 1, 10, 31, 0, 10),
                    endDate: new Date(1970, 1, 1, 10, 31, 0, 930)
                }),
                createEntity('step', {
                    id: 'Calculation_(case2)',
                    warningTime: 1,
                    startDate: new Date(1970, 1, 1, 10, 31, 0, 20),
                    endDate: new Date(1970, 1, 1, 10, 31, 7, 20)
                }),
                createEntity('step', {
                    id: 'Editor_(case2)',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 31, 0, 30),
                    endDate: new Date(1970, 1, 1, 10, 31, 1, 420)
                })
            ]),
    ])
