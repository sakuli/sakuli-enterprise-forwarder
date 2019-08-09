import {TestContextEntity, TestContextEntityStates} from "@sakuli/core";

export const getNagiosResultState = (testDataEntity: TestContextEntity): number => {
    switch (testDataEntity.state) {
        case (TestContextEntityStates.OK):
        case (TestContextEntityStates.WARNING):
        case (TestContextEntityStates.CRITICAL):
            return testDataEntity.state;
        case (TestContextEntityStates.ERROR):
            return TestContextEntityStates.CRITICAL;
        default:
            return TestContextEntityStates.UNKNOWN;
    }
};
