import { Forwarder, Project, TestContextEntity, TestExecutionContext, TestSuiteContext } from "@sakuli/core";
import { getEntityId, ifError, validateProps } from "@sakuli/result-builder-commons";
import { createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger } from "@sakuli/commons";
import { PrometheusForwarderProperties } from "./prometheus-properties.class";
import { pushgatewayService } from "./pushgateway.service";
import {
    addActionError,
    addCaseCriticalThresholdGauge,
    addCaseDurationGauge,
    addCaseError,
    addCaseWarningThresholdGauge,
    addStepCriticalThresholdGauge,
    addStepDurationGauge,
    addStepError,
    addStepWarningThresholdGauge,
    addSuiteCriticalThresholdGauge,
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

    async forward(ctx: TestExecutionContext): Promise<any> {
        return ifPresent(this.properties, async properties => {
            if(properties.enabled){
                this.logInfo(`Forwarding check result to Prometheus.`);
                await this.send(ctx, properties);
            }else{
                this.logInfo(`Prometheus forwarding disabled via properties.`);
            }
        },
        () => {
            this.logError('Could not obtain PrometheusForwarderProperties object.');
            return Promise.reject('Could not obtain PrometheusForwarderProperties object.')
        });
    }


    private async send(ctx: TestExecutionContext, properties: PrometheusForwarderProperties) {
        try {
            ctx.testSuites.forEach((testSuiteContext) => {
                this.logDebug(`Adding suite ${getEntityId(testSuiteContext)} to gauges.`);
                this.registerSuites(testSuiteContext);
            });
            this.logInfo('Pushing results to prometheus push gateway.');
            this.logDebug(`Pushing with config: ${JSON.stringify(properties)}`);
            await pushgatewayService().push(properties);
        }catch (e) {
            this.logError(`Error while forwarding to prometheus: ${e}`);
            throw e;
        }

    }


    private registerSuites(testSuiteContext: TestSuiteContext) {
        addSuiteWarningThresholdGauge(testSuiteContext);
        addSuiteCriticalThresholdGauge(testSuiteContext);
        testSuiteContext.getChildren().forEach((testCaseContext, testCaseIndex) => {
            this.logDebug(`Adding case ${getEntityId(testCaseContext)} to gauges.`);
            ifError(testCaseContext, () => addCaseError(testSuiteContext, testCaseIndex, testCaseContext));
            addCaseDurationGauge(testSuiteContext, testCaseIndex, testCaseContext);
            this.registerCase(testCaseContext, testCaseIndex);
        });
    }

    private registerCase(testCaseContext: TestContextEntity, testCaseIndex: number) {
        addCaseWarningThresholdGauge(testCaseIndex, testCaseContext);
        addCaseCriticalThresholdGauge(testCaseIndex, testCaseContext);
        testCaseContext.getChildren().forEach((testStepContext, testStepIndex) => {
            this.logDebug(`Adding step ${getEntityId(testStepContext)} to gauges.`);
            this.addCaseGauges(testStepContext, testCaseIndex, testCaseContext, testStepIndex);
            this.registerSteps(testStepContext, testStepIndex);
        });
    }

    private registerSteps(testStepContext: TestContextEntity, testStepIndex: number) {
        testStepContext.getChildren().forEach((testActionContext, testActionIndex) =>{
            this.logDebug(`Adding action ${getEntityId(testActionContext)} to gauges.`);
            ifError(testActionContext, () => addActionError(testStepIndex,
                                                            testStepContext,
                                                            testActionIndex,
                                                            testActionContext));
        })
    }

    private addCaseGauges(testStepContext: TestContextEntity,
                          testCaseIndex: number,
                          testCaseContext: TestContextEntity,
                          testStepIndex: number) {
        ifError(testStepContext, () => addStepError(testCaseIndex, testCaseContext, testStepIndex, testStepContext));
        addStepWarningThresholdGauge(testStepIndex, testStepContext);
        addStepCriticalThresholdGauge(testStepIndex, testStepContext);
        if(this.isNotLegacyTestStep(testStepContext,testStepIndex, testCaseContext)){
            addStepDurationGauge(testCaseIndex, testCaseContext, testStepIndex, testStepContext);
        }
    }

    private isNotLegacyTestStep(testStepContext: TestContextEntity,
                             testStepIndex: number,
                             testCaseContext: TestContextEntity) {
        return testStepContext.id || testStepIndex !== testCaseContext.getChildren().length-1;
    }
}