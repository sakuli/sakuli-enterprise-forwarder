import {TestContextEntity} from "@sakuli/core";
import {ifPresent, isPresent, Maybe} from "@sakuli/commons";
import {concat} from "./concat.function";
import {getNagiosResultState, getShortState} from "@sakuli/result-builder-commons";

/**
 * @param entity
 */
export const createPluginOutput = (entity: TestContextEntity): string[] => {
    const outputs: string[] = [];
    const getErrorMessage = (e: Maybe<Error>) => ifPresent(e, e => e.message, () => 'UNKNOWN');
    const runTimeInfo = (() => {
        switch (entity.state) {
            case 1:
                return `(${entity.duration}s > ${entity.warningTime} warning threshold)`;
            case 2:
                return `(${entity.duration}s > ${entity.criticalTime} critical threshold)`;
            case 3:
                return ``;
            case 4:
                return `Error: "${getErrorMessage(entity.error)}" (${entity.duration}s)`;
            default:
                return `(${entity.duration}s)`
        }
    })();
    const text = `${getShortState(getNagiosResultState(entity))} ${entity.kind} "${entity.id}" ${runTimeInfo}`;
    outputs.push(text, ...entity
        .getChildren()
        .filter((child) => {
            return (isPresent(child.id) && child.id.length)
        })
        .map(createPluginOutput)
        .reduce(concat, [])
    );
    return outputs;
};
