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
import { CheckMkForwarderProperties } from "../../sakuli-forwarder-check_mk/src/checkmk-forwarder-properties.class";


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
        const sectionName = CheckMkTestResultOutputBuilder.getSectionName(props);

        if (props.piggybackHostname && props.piggybackHostname.length) {
            return stripIndents`<<<<${props.piggybackHostname}>>>>
                <<<${sectionName}>>>
                ${data}
                <<<<>>>>
                `;
        } else {
            return stripIndents`<<<${sectionName}>>>
                ${data}
                `;
        }
    }

    private static getSectionName(props: any) {
        return (props && props.sectionName) ? props.sectionName : CheckMkForwarderProperties.SECTION_NAME_DEFAULT;
    }
}
