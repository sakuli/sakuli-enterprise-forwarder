import {createEntity} from "../create-entity.function";
import {TestContextEntity} from "@sakuli/core";

export const TestStep_CRITICAL: TestContextEntity = createEntity('step', {
    id: 'Calculation',
    warningTime: 1,
    criticalTime: 2,
    startDate: new Date(1970, 0, 1, 10, 31, 0, 20),
    endDate: new Date(1970, 0, 1, 10, 31, 7, 20)
});
