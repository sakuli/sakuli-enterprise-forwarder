import {TestContextEntity} from "@sakuli/core";
import {fromEntity, toString} from "./perfdata.class";
import {concat as flatten} from "./concat.function";

export const createPerformanceData = (entity: TestContextEntity): string[] => {
    return [
        toString(fromEntity(entity)),
        ...entity.getChildren().map(createPerformanceData).reduce(flatten, [])
    ]
};
