import { TestContextEntity, TestContextEntityStates } from "@sakuli/core";
import { TemplateModel } from "./template-model.interface";
import { getTestDataEntityType } from "./get-test-data-entity-type.function";
import { convertToUnixTimestamp } from "./convert-to-unix-timestamp.function";
import { ParentMap } from "./create-parent-map.function";
import { Maybe } from "@sakuli/commons/dist";

export function testEntityToTemplateModel(entity: TestContextEntity, parentMap: ParentMap): TemplateModel {

    const testDataEntityType = getTestDataEntityType(entity);
    const host = '';
    const startDateAsUnixTimestamp = convertToUnixTimestamp(entity.startDate);
    const endDateAsUnixTimestamp = convertToUnixTimestamp(entity.endDate);
    const stateNagiosErrorCode = "" + (entity.state === TestContextEntityStates.ERROR
        ? TestContextEntityStates.CRITICAL
        : entity.state);
    let testSuiteId: Maybe<string> = undefined;
    let testCaseId: Maybe<string> = undefined;
    switch(entity.kind) {
        case 'step': {
            const pCase = parentMap.get(entity)!;
            const pSuite = parentMap.get(pCase)!;
            testCaseId = pCase.id || '';
            testSuiteId = pSuite.id || '';
        }
        case 'case': {
            testSuiteId = parentMap.get(entity)!.id || '';
        }
    }

    return ({
        testDataEntityType,
        host,
        endDateAsUnixTimestamp,
        startDateAsUnixTimestamp,
        stateNagiosErrorCode,
        testSuiteId,
        testCaseId
    })
}
