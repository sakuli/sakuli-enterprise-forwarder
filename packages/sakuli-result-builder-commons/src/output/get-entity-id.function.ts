import {TestContextEntity} from "@sakuli/core";
import {ifPresent, Maybe} from "@sakuli/commons";
import {replaceWhitespaces} from "./replace-whitespace.function";

export const UNKNOWN_SUITE = "UNKNOWN_SUITE";
export const UNKNOWN_CASE = "UNKNOWN_CASE";
export const UNKNOWN_STEP = "UNKNOWN_STEP";
export const UNKNOWN_ACTION = "UNKNOWN_ACTION";
export const UNKNOWN_ENTITY = "UNKNOWN_ENTITY";

export const getEntityId = (entity: Maybe<TestContextEntity>): string => {
    return ifPresent(entity, (e: TestContextEntity) => {
        switch (e.kind) {
            case "suite":
                return ifPresent(e.id, (id: string) => replaceWhitespaces(id, "_"), () => UNKNOWN_SUITE);
            case "case":
                return ifPresent(e.id, (id: string) => replaceWhitespaces(id, "_"), () => UNKNOWN_CASE);
            case "step":
                return ifPresent(e.id, (id: string) => replaceWhitespaces(id, "_"), () => UNKNOWN_STEP);
            case "action":
                return ifPresent(e.id, (id: string) => replaceWhitespaces(id, "_"), () => UNKNOWN_ACTION);
            default:
                return UNKNOWN_ENTITY;
        }
    }, () => UNKNOWN_ENTITY);
};
