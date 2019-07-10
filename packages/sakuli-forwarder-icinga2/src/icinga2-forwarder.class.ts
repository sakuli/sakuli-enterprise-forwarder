import { Forwarder, TestExecutionContext, Project, FinishedMeasurable, TestActionContext } from "@sakuli/core";
import { ProcessCheckResultRequest } from "./access/process-check-result-request.interface";
import { SimpleLogger, Maybe, ifPresent } from "@sakuli/commons/dist";
import { Icinga2Properties } from "./icinga2-properties.class";
import { createIcinga2ApiAdapter } from "./access/create-icinga2-api-adapter.function";

export class Icinga2Forwarder implements Forwarder {

    private project: Maybe<Project>;

    forwardActionResult(entity: TestActionContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    async setup(project: Project, logger: SimpleLogger) {
        this.project = project;
    }

    async forward(ctx: TestExecutionContext): Promise<any> {
        //https://my-icinga-host:5665/v1/actions/process-check-result

        await ifPresent(this.project, async project => {
            const properties = project.objectFactory(Icinga2Properties);
            const api = await createIcinga2ApiAdapter(properties);
            const requestData: ProcessCheckResultRequest = {
                check_source: 'check_sakuli',
                check_command: 'check_sakuli',
                exit_status: 0,
                plugin_output: "Sakuli suite 'example_ubuntu_0' (ID: 0000) ran in 49.31 seconds.",
                performance_data: []
            }
            const resp = await api.processCheckResult(requestData);
        },
        () => Promise.reject('Could not obtain project object'));
    }

}
