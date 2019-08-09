import {createEntity} from "@sakuli/result-builder-commons";
import {TestContextEntity} from "@sakuli/core";

export const TestStep_OK: TestContextEntity = createEntity('step', {
    id: 'Calculation',
    warningTime: 20,
    startDate: new Date(1970, 0, 1, 10, 30, 0, 10),
    endDate: new Date(1970, 0, 1, 10, 30, 7, 290)
});
