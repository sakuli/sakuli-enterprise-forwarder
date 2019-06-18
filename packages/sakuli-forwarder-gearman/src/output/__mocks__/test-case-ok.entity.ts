import { createEntity } from "./create-entity.function";

export const TestCase_OK = createEntity('case', {
    //state: 0,
    warningTime: 20,
    criticalTime: 30,
    startDate: new Date(1970 ,1,1,10,30,0),
    endDate: new Date(1970,1,1,10,30,14,20),
    id: 'case1'
}, [
    createEntity('step', {
        //state: 0,
        id: 'Test_Sahi_langin_page',
        warningTime: 5,
        startDate: new Date(1970, 1,1,10,30,0),
        endDate: new Date(1970, 1,1,10,30, 1,160)
    }),
    createEntity('step', {
        //state: 0,
        id: 'Calculation',
        warningTime: 10,
        startDate: new Date(1970, 1,1,10,30, 0,10),
        endDate: new Date(1970, 1,1,10,30,7,290)
    }),
    createEntity('step', {
        //state: 0,
        id: 'Editor',
        warningTime: 10,
        startDate: new Date(1970, 1,1,10,30,0,20),
        endDate: new Date(1970, 1,1,10,30,1,500)
    })
])
