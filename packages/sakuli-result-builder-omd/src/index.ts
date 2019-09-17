import {TestContextEntity} from "@sakuli/core";
import {
    convertToUnixTimestamp,
    CurrentExecutionState,
    getEntityId,
    getNagiosResultState,
    OutputResultParameters,
    renderDetailedSummary,
    renderShortSummary,
    TestContextOutputBuilder
} from "@sakuli/result-builder-commons";
import {renderPerformanceData} from "./templates/performance_data";

export class OmdTestResultOutputBuilder implements TestContextOutputBuilder {
    public render(testContextEntity: TestContextEntity, params: OutputResultParameters): string {
        const {currentSuite, currentCase, props} = params;
        const hostname = (props.nagiosHost) ? props.nagiosHost : '';

        const current = {
            suiteId: getEntityId(currentSuite),
            caseId: getEntityId(currentCase)
        };

        return `type=${props.serviceType}
host_name=${hostname}
start_time=${convertToUnixTimestamp(testContextEntity.startDate)}
finish_time=${convertToUnixTimestamp(testContextEntity.endDate)}
return_code=${getNagiosResultState(testContextEntity)}
${getServiceDescription(testContextEntity, current, props)}
output=${renderShortSummary(testContextEntity, current)}${props.outputDetails ? getDetailedSummary(testContextEntity, current, props) : ""}|${renderPerformanceData(testContextEntity, current.suiteId)} [${props.nagiosCheckCommand}]
`
    };
}

const getDetailedSummary = (entity: TestContextEntity, current: CurrentExecutionState, props: any): string => {
    if (props.outputDetails === 'false') {
        return "";
    }
    return `\\n${renderDetailedSummary(entity, current)}`
};

const getServiceDescription = (testContextEntity: TestContextEntity, current: { suiteId: string, caseId: string }, props: any): string => {
    switch (testContextEntity.kind) {
        case "suite":
            return `service_description=${props && props.nagiosServiceDescription || current.suiteId}`;
        case "case":
            return `service_description=${current.suiteId}_${current.caseId}`;
        case "step":
            const stepId = getEntityId(testContextEntity);
            return `service_description=${current.suiteId}_${current.caseId}_${stepId}`;
    }
    return `service_description=UNKNOWN_SERVICE`;
};
