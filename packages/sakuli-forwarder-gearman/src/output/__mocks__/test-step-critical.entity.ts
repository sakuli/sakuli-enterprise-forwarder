import {createEntity} from "./create-entity.function";
import {TestContextEntityStates} from "@sakuli/core/dist";

export const TestStep_CRITICAL = createEntity('step', {
    //state: TestContextEntityStates.WARNING,
    id: 'Calculation',
    warningTime: 1,
    criticalTime: 2,
    startDate: new Date(1970, 0, 1, 10, 31, 0, 20),
    endDate: new Date(1970, 0, 1, 10, 31, 7, 20)
});
