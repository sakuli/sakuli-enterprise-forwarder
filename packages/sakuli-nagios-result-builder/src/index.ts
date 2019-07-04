import {TestContextEntity} from "@sakuli/core";
import {convertToUnixTimestamp} from "./convert-to-unix-timestamp.function";
import {getNagiosResultState} from "./get-nagios-result-state.function";
import {renderShortSummary} from "./templates/short-summary";
import {renderDetailedSummary} from "./templates/detailed-summary";
import {renderPerformanceData} from "./templates/performance_data";
import {OutputResultParameters} from "@sakuli/result-builder-commons";

const UNKNOWN_SUITE = "UNKNOWN_SUITE";
const UNKNOWN_CASE = "UNKNOWN_CASE";

export class NagiosTestResultOutputBuilder {
    public render(testContextEntity: TestContextEntity, params: OutputResultParameters): string {
        const {currentSuite, currentCase, props} = params;
        const hostname = (props.nagiosHost) ? props.nagiosHost : '';

        const current = {
            suiteId: (currentSuite && currentSuite.id) || UNKNOWN_SUITE,
            caseId: (currentCase && currentCase.id) || UNKNOWN_CASE
        };

        return `type=${props.serviceType}
host_name=${hostname}
start_time=${convertToUnixTimestamp(testContextEntity.startDate)}
finish_time=${convertToUnixTimestamp(testContextEntity.endDate)}
return_code=${getNagiosResultState(testContextEntity)}
${getServiceDescription(testContextEntity, current, props)}
output=${renderShortSummary(testContextEntity, current)}\\n${renderDetailedSummary(testContextEntity, current)}${renderPerformanceData(testContextEntity, current.suiteId)} [${props.nagiosCheckCommand}]
`
    };
}

const getServiceDescription = (testContextEntity: TestContextEntity, current: { suiteId: string, caseId: string }, props: any): string => {
    switch (testContextEntity.kind) {
        case "suite":
            return `service_description=${props.nagiosServiceDescription}`;
        case "case":
            return `service_description=${current.suiteId}_${current.caseId}`;
        case "step":
            return `service_description=${current.suiteId}_${current.caseId}_${testContextEntity.id}`;
    }
    return `service_description=UNKNOWN_SERVICE`;
};
