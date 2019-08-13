import {TestContextEntity} from "@sakuli/core";

export const exceptionMessage = (testDataEntity: TestContextEntity): string => {
    return (testDataEntity.error) ? testDataEntity.error.message : "";
};
