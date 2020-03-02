import { Forwarder, Project, TestContextEntity, TestExecutionContext, TestSuiteContext } from "@sakuli/core";
import { validateProps } from "@sakuli/result-builder-commons";
import { createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger } from "@sakuli/commons";
import { PrometheusForwarderProperties } from "./prometheus-properties.class";
import { pushgatewayService } from "./pushgateway.service";
import {
    addCaseCriticalThresholdGauge,
    addCaseWarningThresholdGauge,
    addStepCriticalThresholdGauge,
    addStepDurationGauge,
    addStepWarningThresholdGauge,
    addSuiteCriticalThresholdGauge,
    addSuiteDurationGauge,
    addSuiteWarningThresholdGauge
} from "./gauge.utils";

export class PrometheusForwarder implements Forwarder {

    private properties: Maybe<PrometheusForwarderProperties>;
    private logger: Maybe<SimpleLogger>;

    async setup(project: Project, logger: SimpleLogger): Promise<void> {
        this.properties = createPropertyObjectFactory(project)(PrometheusForwarderProperties);
        await validateProps(this.properties);
        this.logger = logger;
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
                return this.send(ctx, properties);
            }
            this.logInfo(`Prometheus forwarding disabled via properties.`);
            return Promise.resolve();
        },
            () => Promise.reject('Could not obtain project object'));
    }


    private async send(ctx: TestExecutionContext, properties: PrometheusForwarderProperties) {
        ctx.testSuites.forEach((testSuiteContext) => {
            this.logDebug(`Adding suite ${testSuiteContext.id} to gauges.`);
            this.registerSuites(testSuiteContext);
        });
        return await pushgatewayService().push(properties);
    }


    private registerSuites(testSuiteContext: TestSuiteContext) {
        addSuiteWarningThresholdGauge(testSuiteContext);
        addSuiteCriticalThresholdGauge(testSuiteContext);
        testSuiteContext.getChildren().forEach((testCaseContext, testCaseIndex) => {
            addSuiteDurationGauge(testSuiteContext, testCaseIndex, testCaseContext);
            this.registerCase(testCaseContext, testCaseIndex);
        });
    }

    private registerCase(testCaseContext: TestContextEntity, testCaseIndex: number) {
        addCaseWarningThresholdGauge(testCaseIndex, testCaseContext);
        addCaseCriticalThresholdGauge(testCaseIndex, testCaseContext);
        testCaseContext.getChildren().forEach((testStepContext, testStepIndex) => {
            addStepWarningThresholdGauge(testCaseIndex, testStepContext, testStepIndex);
            addStepCriticalThresholdGauge(testCaseIndex, testStepContext, testStepIndex);
            addStepDurationGauge(testCaseIndex, testCaseContext, testStepIndex, testStepContext);
        });
    }
}