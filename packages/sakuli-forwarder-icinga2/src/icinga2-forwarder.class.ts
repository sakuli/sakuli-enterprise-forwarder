import {FinishedMeasurable, Forwarder, Project, TestActionContext, TestExecutionContext} from "@sakuli/core";
import {ProcessCheckResultRequest} from "./access/process-check-result-request.interface";
import {createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger} from "@sakuli/commons";
import {Icinga2Properties} from "./icinga2-properties.class";
import {createIcinga2ApiAdapter} from "./access/create-icinga2-api-adapter.function";
import {createPerformanceData} from "./data/create-performance-data.function";
import {concat as flatten} from "./data/concat.function";
import {createPluginOutput} from "./data/create-plugin-output.function";
import {EOL} from "os";
import {convertToUnixTimestamp} from "@sakuli/nagios-result-builder";

export class Icinga2Forwarder implements Forwarder {

    private project: Maybe<Project>;
    private logger: Maybe<SimpleLogger>;

    forwardActionResult(entity: TestActionContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    async setup(project: Project, logger: SimpleLogger) {
        this.project = project;
        this.logger = logger;
    }

    logDebug(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.debug(message, ...data));
    }

    async forward(ctx: TestExecutionContext): Promise<any> {
        await ifPresent(this.project, async project => {
                const properties = createPropertyObjectFactory(project)(Icinga2Properties);
                await this.send(properties, ctx);
            },
            () => Promise.reject('Could not obtain project object'));
    }

    async send(properties: Icinga2Properties, ctx: TestExecutionContext) {
        const api = await createIcinga2ApiAdapter(properties);
        const requestData: ProcessCheckResultRequest = {
            "check_source": properties.checkCommand,
            "check_command": properties.checkSource,
            "exit_status": ctx.resultState,
            "plugin_output": ctx.testSuites.map(createPluginOutput).reduce(flatten, []).join(EOL),
            "performance_data": ctx.testSuites.map(createPerformanceData).reduce(flatten, []),
            execution_start: convertToUnixTimestamp(ctx.startDate),
            execution_end: convertToUnixTimestamp(ctx.endDate),
        };

        const resp = await api.processCheckResult(requestData);
    }
}
