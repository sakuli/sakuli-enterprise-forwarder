import {
    FinishedMeasurable,
    Forwarder,
    Project,
    TestActionContext,
    TestCaseContext,
    TestExecutionContext,
    TestStepContext,
    TestSuiteContext
} from "@sakuli/core";
import { validateProps } from "@sakuli/result-builder-commons";
import { createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger } from "@sakuli/commons";
import { PrometheusForwarderProperties } from "./prometheus-properties.class";
import { Pushgateway } from 'prom-client'

export class PrometheusForwarder implements Forwarder {

    private properties: Maybe<PrometheusForwarderProperties>;
    private logger: Maybe<SimpleLogger>;
    private gateway: Maybe<Pushgateway>;

    async setup(project: Project, logger: SimpleLogger): Promise<void> {
        this.properties = createPropertyObjectFactory(project)(PrometheusForwarderProperties);
        await validateProps(this.properties);
        this.logger = logger;
        this.gateway = new Pushgateway(`http://${this.properties.apiHost}:${this.properties.apiPort}`);
    }

    logDebug(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.debug(message, ...data));
    }

    logInfo(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.info(message, ...data));
    }

    logWarn(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.warn(message, ...data));
    }

    logError(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.error(message, ...data));
    }

    forward(ctx: TestExecutionContext): Promise<any> {
        return ifPresent(this.properties, properties => {
            if(properties.enabled){
                this.logInfo(`Forwarding check result to Prometheus.`);
                return this.send(properties);
            }
            this.logInfo(`Prometheus forwarding disabled via properties.`);
            return Promise.resolve();
        },
            () => Promise.reject('Could not obtain project object'));
    }

    forwardActionResult(entity: TestActionContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    forwardStepResult(entity: TestStepContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    forwardCaseResult(entity: TestCaseContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    forwardSuiteResult(entity: TestSuiteContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    private send(properties: PrometheusForwarderProperties) {
        return Promise.resolve();
    }
}