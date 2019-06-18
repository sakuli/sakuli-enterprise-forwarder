import { createEntity } from "./create-entity.function";

export const TestSuite_CRITICAL_IN_CASE = createEntity('suite', {
    id: 'example_xfce',
    warningTime: 300,
    criticalTime: 400,
    startDate: new Date(1970, 1, 1, 10, 35, 0),
    endDate: new Date(1970, 1, 1, 10, 35, 46, 960)
}, [
        createEntity('case', {
            id: 'case1',
            warningTime: 20,
            criticalTime: 30,
            startDate: new Date(1970, 1, 1, 10, 35, 0),
            endDate: new Date(1970, 1, 1, 10, 35, 14, 130)
        }, [
                createEntity('step', {
                    id: 'Test_Sahi_landing_page',
                    warningTime: 5,
                    startDate: new Date(1970, 1, 1, 10, 35, 0),
                    endDate: new Date(1970, 1, 1, 10, 35, 1, 280)
                }),
                createEntity('step', {
                    id: 'Calculation',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 35, 0, 10),
                    endDate: new Date(1970, 1, 1, 10, 35, 7, 310)
                }),
                createEntity('step', {
                    id: 'Editor',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 35, 0, 20),
                    endDate: new Date(1970, 1, 1, 10, 35, 1, 470)
                })
            ]),
        createEntity('case', {
            id: 'case2',
            warningTime: 2,
            criticalTime: 3,
            startDate: new Date(1970, 1, 1, 10, 35, 20),
            endDate: new Date(1970, 1, 1, 10, 35, 33, 700)
        }, [
                createEntity('step', {
                    id: 'Test_Sahi_landing_page_(case2)',
                    warningTime: 5,
                    startDate: new Date(1970, 1, 1, 10, 35, 0),
                    endDate: new Date(1970, 1, 1, 10, 35, 1, 80)
                }),
                createEntity('step', {
                    id: 'Calculation_(case2)',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 35, 0, 10),
                    endDate: new Date(1970, 1, 1, 10, 35, 7, 120)
                }),
                createEntity('step', {
                    id: 'Editor_(case2)',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 35, 0, 20),
                    endDate: new Date(1970, 1, 1, 10, 35, 1, 440)
                })
            ]),
    ])
