import {TestContextEntity} from "@sakuli/core";
import {fromEntity, toString} from "./perfdata.class";
import {concat as flatten} from "./concat.function";
import {isPresent} from "@sakuli/commons";

export const createPerformanceData = (entity: TestContextEntity): string[] => {
    return [
        toString(fromEntity(entity)),
        ...entity
            .getChildren()
            .filter((child) => {
                return (isPresent(child.id) && child.id.length)
            }).map(createPerformanceData).reduce(flatten, [])
    ]
};
