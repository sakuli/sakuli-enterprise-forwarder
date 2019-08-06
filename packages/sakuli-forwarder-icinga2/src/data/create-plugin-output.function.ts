import { TestContextEntity, TestCaseContext, TestSuiteContext, TestContextEntityStates } from "@sakuli/core";
import { ifPresent, objectReflection, Maybe } from "@sakuli/commons";
import { getShortState } from '@sakuli/nagios-result-builder';
import { concat } from "./concat.function";

/**
 * @param entity
 * @param props
 */
export const createPluginOutput = (entity: TestContextEntity): string[] => {
    const outputs: string[] = [];
    const getErrorMessage = (e: Maybe<Error>) => ifPresent(e, e => e.message, () => 'UNKNOWN');
    const runTimeInfo = (() => {
        switch (entity.state) {
            case 1: return `(${entity.duration}s > ${entity.warningTime} warning threshold)`
            case 2: return `(${entity.duration}s > ${entity.criticalTime} critical threshold)`
            case 2: return ``
            case 4: return `Error: "${getErrorMessage(entity.error)}" (${entity.duration}s)`
            default: return `(${entity.duration}s)`
        }
    })();
    const text = `${getShortState(entity.state)} ${entity.kind} "${entity.id}" ${runTimeInfo}`;
    outputs.push(text, ...entity
        .getChildren()
        .map(createPluginOutput)
        .reduce(concat, [])
    )
    return outputs;
}