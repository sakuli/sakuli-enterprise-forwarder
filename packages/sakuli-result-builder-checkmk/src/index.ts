import {TestContextEntity} from "@sakuli/core";
import {renderPerformanceData} from "./templates/performance_data";
import {
    getEntityId,
    getNagiosResultState,
    OutputResultParameters,
    renderDetailedSummary,
    renderShortSummary,
    TestContextOutputBuilder
} from "@sakuli/result-builder-commons";
import {oneLine, stripIndents} from "common-tags";


export class CheckMkTestResultOutputBuilder implements TestContextOutputBuilder {
    public render(testContextEntity: TestContextEntity, params: OutputResultParameters): string {
        const {currentSuite, currentCase, props} = params;

        const current = {
            suiteId: getEntityId(currentSuite),
            caseId: getEntityId(currentCase)
        };
        const serviceDescription = (props && props.serviceDescription) || current.suiteId;
        const data = oneLine`
        ${getNagiosResultState(testContextEntity)}
        ${serviceDescription}
        ${renderPerformanceData(testContextEntity)}
        ${renderShortSummary(testContextEntity)}
        ${props.outputDetails ? renderDetailedSummary(testContextEntity) : ""}
        `;
        return stripIndents`<<<${props.piggybackHostname}>>>
                ${data}

                `;
    };
}
