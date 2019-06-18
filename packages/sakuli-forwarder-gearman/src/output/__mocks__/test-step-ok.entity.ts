import { createEntity } from "./create-entity.function";
import { TestContextEntityStates } from "@sakuli/core/dist";

export const TestStep_OK = createEntity('step', {
    //state: TestContextEntityStates.OK,
    id: 'Calculation',
    warningTime: 20,
    startDate: new Date(1970,1,1,10,30,0,10),
    endDate: new Date(1970, 1,1,10,30,7,290)
})
