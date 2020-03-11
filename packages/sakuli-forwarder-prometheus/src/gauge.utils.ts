import { TestActionContext, TestContextEntity, TestSuiteContext } from "@sakuli/core";
import { Gauge, GaugeConfiguration, register } from "prom-client";
import { getEntityId } from "@sakuli/result-builder-commons";

interface GaugeDefinition {
    name: string,
    help: string
    labels?: Record<string, string>,
    measurement: number
}

const GAUGE_REGEX=/^[a-zA-Z_:][a-zA-Z0-9_:]*$/;

export function addSuiteWarningThresholdGauge(testSuiteContext: TestSuiteContext) {
    const suiteIdentifier = createSuiteIdentifier(testSuiteContext);
    registerGauge({
        name: `suite_${suiteIdentifier}_warning_thresholds_seconds`,
        help: `Warning threshold for suite '${suiteIdentifier}'`,
        measurement: testSuiteContext.warningTime
    });
}

export function addCaseWarningThresholdGauge(testCaseIndex: number, testCaseContext: TestContextEntity) {
    const caseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    registerGauge({
        name: `case_${caseIdentifier}_warning_thresholds_seconds`,
        help: `Warning threshold for case '${caseIdentifier}'`,
        measurement: testCaseContext.warningTime
    });
}

export function addStepWarningThresholdGauge(testStepIndex: number, testStepContext: TestContextEntity) {
    const stepIdentifier = createStepIdentifier(testStepIndex, testStepContext);
    registerGauge({
        name: `step_${stepIdentifier}_warning_thresholds_seconds`,
        help: `Warning threshold for step '${stepIdentifier}'`,
        measurement: testStepContext.warningTime
    });
}

export function addCaseDurationGauge(testSuiteContext: TestSuiteContext,
                                      testCaseIndex: number,
                                      testCaseContext: TestContextEntity) {
    const suiteIdentifier = createSuiteIdentifier(testSuiteContext);
    const testCaseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    registerGauge({
        name: `suite_${suiteIdentifier}_duration_seconds`,
        help: `Duration in seconds of suite '${suiteIdentifier}'`,
        labels: {
            "case": `${testCaseIdentifier}`
        },
        measurement: testCaseContext.duration
    });
}

export function addStepDurationGauge(testCaseIndex: number,
                                      testCaseContext: TestContextEntity,
                                      testStepIndex: number,
                                      testStepContext: TestContextEntity) {
    const caseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    const stepIdentifier = createStepIdentifier(testStepIndex, testStepContext);
    registerGauge({
        name: `case_${caseIdentifier}_duration_seconds`,
        help: `Duration in seconds of case '${caseIdentifier}'`,
        labels: {
            "step": `${stepIdentifier}`
        },
        measurement: testStepContext.duration
    });
}

export function addSuiteCriticalThresholdGauge(testSuiteContext: TestSuiteContext) {
    const suiteIdentifier = createSuiteIdentifier(testSuiteContext);
    registerGauge({
        name: `suite_${suiteIdentifier}_critical_thresholds_seconds`,
        help: `Critical threshold for suite '${suiteIdentifier}'`,
        measurement: testSuiteContext.criticalTime
    });
}

export function addCaseCriticalThresholdGauge(testCaseIndex: number, testCaseContext: TestContextEntity) {
    const caseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    registerGauge({
        name: `case_${caseIdentifier}_critical_thresholds_seconds`,
        help: `Critical threshold for case '${caseIdentifier}'`,
        measurement: testCaseContext.criticalTime
    });
}

export function addStepCriticalThresholdGauge(testStepIndex: number, testStepContext: TestContextEntity) {
    const stepIdentifier = createStepIdentifier(testStepIndex, testStepContext);
    registerGauge({
        name: `step_${stepIdentifier}_critical_thresholds_seconds`,
        help: `Critical threshold for step '${stepIdentifier}'`,
        measurement: testStepContext.criticalTime
    });
}

export function addCaseError(testSuiteContext: TestSuiteContext,
                             testCaseIndex: number,
                             testCaseContext: TestContextEntity) {
    const suiteIdentifier = createSuiteIdentifier(testSuiteContext);
    const caseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    registerGauge({
        name: `suite_${suiteIdentifier}_error`,
        help: `Error state for suite '${suiteIdentifier}'`,
        labels: {
            "case": `${caseIdentifier}`
        },
        measurement: 1
    });
}

export function addStepError(testCaseIndex: number,
                             testCaseContext: TestContextEntity,
                             testStepIndex: number,
                             testStepContext: TestContextEntity,) {
    const caseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    const stepIdentifier = createStepIdentifier(testStepIndex, testStepContext);
    registerGauge({
        name: `case_${caseIdentifier}_error`,
        help: `Error state for case '${caseIdentifier}'`,
        labels: {
            "step": `${stepIdentifier}`
        },
        measurement: 1
    });
}

export function addActionError(testStepIndex: number,
                               testStepContext: TestContextEntity,
                               testActionIndex: number,
                               testActionContext: TestActionContext) {
    const stepIdentifier = createStepIdentifier(testStepIndex, testStepContext);
    const actionIdentifier = createActionIdentifier(testActionIndex, testActionContext);
    registerGauge({
        name: `step_${stepIdentifier}_error`,
        help: `Error state for step '${stepIdentifier}'`,
        labels: {
            "action": `${actionIdentifier}`
        },
        measurement: 1
    });
}


function registerGauge(gaugeDefinition: GaugeDefinition){
    verifyGaugeName(gaugeDefinition.name);

    let gauge = register.getSingleMetric(gaugeDefinition.name) as Gauge;
    if(!gauge){
        gauge = registerNewGauge(gaugeDefinition);
    }

    if(gaugeDefinition.labels){
        gauge.set(gaugeDefinition.labels, gaugeDefinition.measurement);
    }else{
        gauge.set(gaugeDefinition.measurement);
    }
}

function verifyGaugeName(gaugeName: string){
    if(GAUGE_REGEX.test(gaugeName)){
        return gaugeName;
    }
    throw Error(`Gauge name '${gaugeName}' does not match required regex '${GAUGE_REGEX}'`)
}

function registerNewGauge(gaugeDefinition: GaugeDefinition) {
    let gaugeConfiguration: GaugeConfiguration = {
        name: gaugeDefinition.name,
        help: gaugeDefinition.help
    };

    if (gaugeDefinition.labels) {
        gaugeConfiguration = {
            ...gaugeConfiguration,
            labelNames: Object.keys(gaugeDefinition.labels)
        };
    }
    return new Gauge(gaugeConfiguration);
}

function createSuiteIdentifier(testSuiteContext: TestSuiteContext) {
    return getEntityId(testSuiteContext);
}

function createCaseIdentifier(testCaseIndex: number, testCaseContext: TestContextEntity){
    return `${addPaddingZeroes(testCaseIndex)}_${getEntityId(testCaseContext)}`;
}

function createStepIdentifier(testStepIndex: number, testStepContext: TestContextEntity){
    return `${addPaddingZeroes(testStepIndex)}_${getEntityId(testStepContext)}`
}

function createActionIdentifier(testActionIndex: number, testActionContext: TestContextEntity) {
    return `${addPaddingZeroes(testActionIndex)}_${getEntityId(testActionContext)}`;
}

function  addPaddingZeroes(number: number){
    return number.toString().padStart(3, '0');
}