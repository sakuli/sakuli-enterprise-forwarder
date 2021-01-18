import { Forwarder, Project, TestExecutionContext } from "@sakuli/core";
import { ProcessCheckResultRequest } from "./access/process-check-result-request.interface";
import { createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger } from "@sakuli/commons";
import { Icinga2Properties } from "./icinga2-properties.class";
import { createIcinga2ApiAdapter } from "./access/create-icinga2-api-adapter.function";
import { createPerformanceData } from "./data/create-performance-data.function";
import { concat as flatten } from "./data/concat.function";
import { createPluginOutput } from "./data/create-plugin-output.function";
import { EOL } from "os";
import { convertToUnixTimestamp, validateProps } from "@sakuli/result-builder-commons";
import { renderIcinga2Properties } from "./icinga2-properties-renderer.function";

export class Icinga2Forwarder implements Forwarder {

    private properties: Maybe<Icinga2Properties>;
    private logger: Maybe<SimpleLogger>;

    async setup(project: Project, logger: SimpleLogger): Promise<void> {
        this.properties = createPropertyObjectFactory(project)(Icinga2Properties);
        if(this.properties.enabled){
        await validateProps(this.properties);
        }
        this.logger = logger;
        ifPresent(this.properties, (props) => this.logger?.debug(renderIcinga2Properties(props)));
    }

    async forward(ctx: TestExecutionContext): Promise<any> {
        await ifPresent(this.properties, props => {
                if (props.enabled) {
                    this.logger?.info(`Forwarding check result to Icinga2.`);
                    return this.send(props, ctx);
                } else {
                    this.logger?.debug(`Icinga2 forwarding disabled via properties.`);
                    return Promise.resolve();
                }
            },
            () => Promise.reject('Could not obtain project object'));
    }

    async send(properties: Icinga2Properties, ctx: TestExecutionContext) {
        this.logger?.debug(`Creating API client.`);
        try {
            const api = await createIcinga2ApiAdapter(properties, this.logger);
            const requestData: ProcessCheckResultRequest = {
                "check_source": properties.checkSource,
                "check_command": properties.checkCommand,
                //For Sakuli error states we use the critical state in icinga because the error state 4 results in UNKNOWN
                "exit_status": ctx.resultState === 4 ? 2 : ctx.resultState,
                "plugin_output": ctx.testSuites.map(createPluginOutput).reduce(flatten, []).join(EOL),
                "performance_data": ctx.testSuites.map(createPerformanceData).reduce(flatten, []),
                execution_start: convertToUnixTimestamp(ctx.startDate),
                execution_end: convertToUnixTimestamp(ctx.endDate),
            };
            return await api.processCheckResult(requestData);
        } catch (e) {
            this.logger?.error(e);
            return await Promise.reject(e);
        }
    }
}
