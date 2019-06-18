import { createEntity } from "./create-entity.function";

export const TestSuite_ERRORS = createEntity('suite', {
    id: 'example_xfce',
    warningTime: 300,
    criticalTime: 400,
    startDate: new Date(1970, 1, 1, 10, 36, 0),
    endDate: new Date(1970, 1, 1, 10, 36, 44, 800)
}, [
        createEntity('case', {
            id: 'case1',
            warningTime: 20,
            criticalTime: 30,
            startDate: new Date(1970, 1, 1, 10, 36, 0),
            endDate: new Date(1970, 1, 1, 10, 36, 14, 200)
        }, [
                createEntity('step', {
                    id: 'Test_Sahi_landing_page',
                    warningTime: 5,
                    startDate: new Date(1970, 1, 1, 10, 36, 0),
                    endDate: new Date(1970, 1, 1, 10, 36, 1, 140)
                }),
                createEntity('step', {
                    id: 'Calculation',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 36, 0, 10),
                    endDate: new Date(1970, 1, 1, 10, 36, 7, 540)
                }),
                createEntity('step', {
                    id: 'Editor',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 36, 0, 20),
                    endDate: new Date(1970, 1, 1, 10, 36, 1, 470)
                })
            ]),
        createEntity('case', {
            id: 'case2',
            warningTime: 20,
            criticalTime: 30,
            startDate: new Date(1970, 1, 1, 10, 36, 10),
            endDate: new Date(1970, 1, 1, 10, 36, 23, 550)
        }, [
                createEntity('step', {
                    id: 'Test_Sahi_landing_page_(case2)',
                    warningTime: 5,
                    startDate: new Date(1970, 1, 1, 10, 36, 0),
                    endDate: new Date(1970, 1, 1, 10, 36, 1, 50),
                    error: Error(`_highlight(_link(\"xSL Manager\")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>`)
                }),
                createEntity('step', {
                    id: 'Calculation_(case2)',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 36, 10),
                    endDate: new Date(1970, 1, 1, 10, 36, 17, 30)
                }),
                createEntity('step', {
                    id: 'Editor_(case2)',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 36, 20),
                    endDate: new Date(1970, 1, 1, 10, 36, 21, 390)
                })
            ]),
    ])
