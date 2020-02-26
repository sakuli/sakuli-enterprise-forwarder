import { Forwarder, Project, TestContextEntity, TestExecutionContext, TestSuiteContext } from "@sakuli/core";
import { validateProps } from "@sakuli/result-builder-commons";
import { createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger } from "@sakuli/commons";
import { PrometheusForwarderProperties } from "./prometheus-properties.class";
import { pushgatewayService } from "./pushgateway.service";
import { createGauge } from "./create-gauge.function";

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
            this.addSuiteWarningGauge(testSuiteContext);
            testSuiteContext.getChildren().forEach((testCaseContext, testCaseIndex) => {
                this.addCaseWarningThresholdGauge(testCaseIndex, testCaseContext);
                this.addSuiteDurationGauge(testSuiteContext, testCaseIndex, testCaseContext);
                testCaseContext.getChildren().forEach((testStepContext, testStepIndex) => {
                    createGauge({
                        name: `${this.addPaddingZeroes(testStepIndex)}_${testStepContext.id}_step_warning_thresholds_seconds`,
                        measurement: testStepContext.warningTime
                    });
                    this.addStepDurationGauge(testCaseIndex, testCaseContext, testStepIndex, testStepContext);
                });
            });
        });
        return await pushgatewayService().push(properties);
    }

    private addSuiteWarningGauge(testSuiteContext: TestSuiteContext) {
        createGauge({
            name: `${testSuiteContext.id}_suite_warning_thresholds_seconds`,
            measurement: testSuiteContext.warningTime
        });
    }

    private addCaseWarningThresholdGauge(testCaseIndex: number, testCaseContext: TestContextEntity) {
        createGauge({
            name: `${this.addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}_case_warning_thresholds_seconds`,
            measurement: testCaseContext.warningTime
        });
    }

    private addSuiteDurationGauge(testSuiteContext: TestSuiteContext,
                                      testCaseIndex: number,
                                      testCaseContext: TestContextEntity) {
        createGauge({
            name: `${testSuiteContext.id}_suite_duration_seconds`,
            labels: {
                "case": `${this.addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}`
            },
            measurement: testCaseContext.duration
        });
    }

    private addStepDurationGauge(testCaseIndex: number,
                                     testCaseContext: TestContextEntity,
                                     testStepIndex: number,
                                     testStepContext: TestContextEntity) {
        createGauge({
            name: `${this.addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}_case_duration_seconds`,
            labels: {
                "step": `${this.addPaddingZeroes(testStepIndex)}_${testStepContext.id}`
            },
            measurement: testCaseContext.duration
        });
    }

    private addPaddingZeroes(number: number){
        return number.toString().padStart(3, '0');
    }
}