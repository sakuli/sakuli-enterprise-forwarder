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
import { renderPrometheusProperties } from "./prometheus-properties-renderer.function";

export class PrometheusForwarder implements Forwarder {

    private properties: Maybe<PrometheusForwarderProperties>;
    private logger: Maybe<SimpleLogger>;

    async setup(project: Project, logger: SimpleLogger): Promise<void> {
        this.properties = createPropertyObjectFactory(project)(PrometheusForwarderProperties);
        if(this.properties.enabled){
        await validateProps(this.properties);
        }
        this.logger = logger;
        ifPresent(this.properties, (props) => {this.logDebug(renderPrometheusProperties(props))});
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
                await this.push(ctx, properties);
            }else{
                this.logInfo(`Prometheus forwarding disabled via properties.`);
            }
        },
        () => {
            this.logError('Could not obtain PrometheusForwarderProperties object.');
            return Promise.reject('Could not obtain PrometheusForwarderProperties object.')
        });
    }

    private async push(ctx: TestExecutionContext, properties: PrometheusForwarderProperties) {
        try {
            this.registerSuites(ctx);
            this.logInfo('Pushing results to prometheus push gateway.');
            this.logDebug(`Pushing with config: ${JSON.stringify(properties)}`);
            await pushgatewayService().push(properties);
        }catch (e) {
            this.logError(`Error while forwarding to prometheus: ${e}`);
            throw e;
        }

    }

    private registerSuites(testExecutionContext: TestExecutionContext) {
        testExecutionContext.testSuites.forEach((testSuiteContext) => {
            this.logDebug(`Adding suite ${getEntityId(testSuiteContext)} to gauges.`);
            this.registerSuite(testSuiteContext);
        });
    }

    private registerSuite(testSuiteContext: TestSuiteContext) {
        addSuiteWarningThresholdGauge(testSuiteContext);
        addSuiteCriticalThresholdGauge(testSuiteContext);
        this.registerCases(testSuiteContext);
    }

    private registerCases(testSuiteContext: TestSuiteContext) {
        testSuiteContext.getChildren().forEach((testCaseContext, testCaseIndex) => {
            this.logDebug(`Adding case ${getEntityId(testCaseContext)} to gauges.`);
            this.addCaseGauges(testCaseContext, testSuiteContext, testCaseIndex);
            this.registerSteps(testCaseContext, testCaseIndex);
        });
    }

    private registerSteps(testCaseContext: TestContextEntity, testCaseIndex: number) {
        testCaseContext.getChildren().forEach((testStepContext, testStepIndex) => {
            this.logDebug(`Adding step ${getEntityId(testStepContext)} to gauges.`);
            this.addStepGauges(testStepContext, testStepIndex, testCaseContext, testCaseIndex);
            this.registerActions(testStepContext, testStepIndex);
        });
    }

    private registerActions(testStepContext: TestContextEntity, testStepIndex: number) {
        testStepContext.getChildren().forEach((testActionContext, testActionIndex) =>{
            this.logDebug(`Adding action ${getEntityId(testActionContext)} to gauges.`);
            ifError(testActionContext, () => addActionError(testStepIndex,
                testStepContext,
                testActionIndex,
                testActionContext));
        })
    }

    private addCaseGauges(testCaseContext: TestContextEntity,
                          testSuiteContext: TestSuiteContext,
                          testCaseIndex: number) {
        ifError(testCaseContext, () => addCaseError(testSuiteContext, testCaseIndex, testCaseContext));
        addCaseDurationGauge(testSuiteContext, testCaseIndex, testCaseContext);
        addCaseWarningThresholdGauge(testCaseIndex, testCaseContext);
        addCaseCriticalThresholdGauge(testCaseIndex, testCaseContext);
    }

    private addStepGauges(testStepContext: TestContextEntity,
                          testStepIndex: number,
                          testCaseContext: TestContextEntity,
                          testCaseIndex: number) {
        ifError(testStepContext, () => addStepError(testCaseIndex, testCaseContext, testStepIndex, testStepContext));
        if(this.isNotEmptyTrailingTestStep(testStepContext,testStepIndex, testCaseContext)){
            addStepWarningThresholdGauge(testStepIndex, testStepContext);
            addStepCriticalThresholdGauge(testStepIndex, testStepContext);
            addStepDurationGauge(testCaseIndex, testCaseContext, testStepIndex, testStepContext);
        }
    }

    private isNotEmptyTrailingTestStep(testStepContext: TestContextEntity,
                             testStepIndex: number,
                             testCaseContext: TestContextEntity) {
        return ifPresent(testStepContext.id, () => !!testStepContext.id, () => false)
                    || testStepIndex !== testCaseContext.getChildren().length-1;
    }
}