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
        const props = params.props;

        const current = {
            suiteId: getEntityId(params.currentSuite),
            caseId: getEntityId(params.currentCase)
        };
        const serviceDescription = (props && props.serviceDescription) || current.suiteId;
        const data = oneLine`
        ${getNagiosResultState(testContextEntity)}
        ${serviceDescription}
        ${renderPerformanceData(testContextEntity)}
        ${renderShortSummary(testContextEntity)}
        ${props.outputDetails ? renderDetailedSummary(testContextEntity) : ""}
        `;

        if (props.piggybackHostname && props.piggybackHostname.length) {
            return stripIndents`<<<<${props.piggybackHostname}>>>>
                <<<${props.sectionName}>>>
                ${data}
                <<<<>>>>
                `;
        } else {
            return stripIndents`<<<${props.sectionName}>>>
                ${data}
                `;
        }
    }
}