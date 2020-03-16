import { TestContextEntity, TestContextEntityStates } from "@sakuli/core";

export function ifError<T extends TestContextEntity>(testContext: T, then: (v: T) => void){
    if(testContext.state === TestContextEntityStates.ERROR){
        then(testContext);
    }
}