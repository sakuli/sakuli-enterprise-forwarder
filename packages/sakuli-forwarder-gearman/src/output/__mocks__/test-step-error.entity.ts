import {createEntity} from "./create-entity.function";
import {TestContextEntityStates} from "@sakuli/core/dist";

export const TestStep_ERRORS = createEntity('step', {
    //state: TestContextEntityStates.ERROR,
    id: 'Test_Sahi_landing_page',
    warningTime: 10,
    startDate: new Date(1970, 0, 1, 10, 36, 0),
    endDate: new Date(1970, 0, 1, 10, 36, 1, 50),
    error: Error("_highlight(_link(\"xSL Manager\")); TypeError: el is undefined Sahi.prototype._highlight@http://sahi.example.com/_s_/spr/concat.js:1210:9 @http://sahi.example.com/_s_/spr/concat.js line 3607 > eval:1:1 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/concat.js:3607:9 Sahi.prototype.ex@http://sahi.example.com/_s_/spr/sakuli/inject.js:46:12 @http://sahi.example.com/_s_/spr/concat.js:3373:5  <a href='/_s_/dyn/Log_getBrowserScript?href=/root/sakuli/example_test_suites/example_xfce/case2/sakuli_demo.js&n=1210'><b>Click for browser script</b></a>")
});
