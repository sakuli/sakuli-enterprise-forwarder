import {TestContextEntity} from "@sakuli/core";
import {renderPerformanceData} from "./templates/performance_data";
import {
    getNagiosResultState,
    OutputResultParameters,
    renderDetailedSummary,
    renderShortSummary,
    TestContextOutputBuilder
} from "@sakuli/result-builder-commons";
import {stripIndents} from "common-tags";
import {getEntityId} from "@sakuli/result-builder-commons/dist/output/get-entity-id.function";


export class CheckMkTestResultOutputBuilder implements TestContextOutputBuilder {
    public render(testContextEntity: TestContextEntity, params: OutputResultParameters): string {
        const {currentSuite, currentCase, props} = params;

        const current = {
            suiteId: getEntityId(currentSuite),
            caseId: getEntityId(currentCase)
        };
        const serviceDescription = (props && props.serviceDescription) || current.suiteId;
        const data = `${getNagiosResultState(testContextEntity)} ${serviceDescription} ${renderPerformanceData(testContextEntity)} ${renderShortSummary(testContextEntity)} ${renderDetailedSummary(testContextEntity)}`;
        return stripIndents`<<<local>>>
                ${data}

                `;
    };
}
