import {createEntity} from "./create-entity.function";
import {TestContextEntityStates} from "@sakuli/core/dist";

export const TestCase_ERRORS = createEntity('case', {
    //state: TestContextEntityStates.ERROR,
    warningTime: 20,
    criticalTime: 30,
    startDate: new Date(1970, 0, 1, 10, 36, 10),
    endDate: new Date(1970, 0, 1, 10, 36, 23, 550)
}, [
    createEntity('step', {
        //state: TestContextEntityStates.ERROR,
        id: 'Test_Sahi_landing_page_(case2)',
        warningTime: 5,
        startDate: new Date(1970, 0, 1, 10, 36, 0),
        endDate: new Date(1970, 0, 1, 10, 36, 1, 50),
        error: Error("_highlight(_link(\"xSL Manager\")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>")
    }),
    createEntity('step', {
        //state: TestContextEntityStates.OK,
        id: 'Calculation_(case2)',
        warningTime: 10,
        startDate: new Date(1970, 0, 1, 10, 36, 10),
        endDate: new Date(1970, 0, 1, 10, 36, 17, 30)
    }),
    createEntity('step', {
        //state: TestContextEntityStates.OK,
        id: 'Editor_(case2)',
        warningTime: 10,
        startDate: new Date(1970, 0, 1, 10, 36, 20),
        endDate: new Date(1970, 0, 1, 10, 36, 21, 390)
    })
]);

