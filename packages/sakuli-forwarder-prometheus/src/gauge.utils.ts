import { TestActionContext, TestContextEntity, TestSuiteContext } from "@sakuli/core";
import { Gauge, GaugeConfiguration } from "prom-client";
import { oneLineTrim } from 'common-tags';

interface GaugeDefinition {
    name: string,
    help: string
    labels?: Record<string, string>,
    measurement: number
}
function createGauge(gaugeDefinition: GaugeDefinition){
    let gaugeConfiguration: GaugeConfiguration = {
        name: gaugeDefinition.name,
        help: gaugeDefinition.help
    };

    if(gaugeDefinition.labels){
        gaugeConfiguration = {...gaugeConfiguration,
            labelNames: Object.keys(gaugeDefinition.labels)
        };
    }

    const gauge = new Gauge(gaugeConfiguration);

    if(gaugeDefinition.labels){
        gauge.set(gaugeDefinition.labels, gaugeDefinition.measurement);
    }else{
        gauge.set(gaugeDefinition.measurement);
    }
}

export function  addSuiteWarningThresholdGauge(testSuiteContext: TestSuiteContext) {
    createGauge({
        name: `${testSuiteContext.id}_suite_warning_thresholds_seconds`,
        help: `Warning threshold for suite '${testSuiteContext.id}'`,
        measurement: testSuiteContext.warningTime
    });
}

export function  addCaseWarningThresholdGauge(testCaseIndex: number, testCaseContext: TestContextEntity) {
    const caseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    createGauge({
        name: `${caseIdentifier}_case_warning_thresholds_seconds`,
        help: `Warning threshold for case '${caseIdentifier}'`,
        measurement: testCaseContext.warningTime
    });
}

export function  addStepWarningThresholdGauge(testStepIndex: number, testStepContext: TestContextEntity) {
    const stepIdentifier = createStepIdentifier(testStepIndex, testStepContext);
    createGauge({
        name: `${stepIdentifier}_step_warning_thresholds_seconds`,
        help: `Warning threshold for step '${stepIdentifier}'`,
        measurement: testStepContext.warningTime
    });
}

export function  addCaseDurationGauge(testSuiteContext: TestSuiteContext,
                                      testCaseIndex: number,
                                      testCaseContext: TestContextEntity) {
    createGauge({
        name: `${testSuiteContext.id}_suite_duration_seconds`,
        help: `Duration in seconds of suite '${testSuiteContext.id}' on case '${testCaseContext.id}'`,
        labels: {
            "case": `${addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}`
        },
        measurement: testCaseContext.duration
    });
}

export function  addStepDurationGauge(testCaseIndex: number,
                                      testCaseContext: TestContextEntity,
                                      testStepIndex: number,
                                      testStepContext: TestContextEntity) {
    const caseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    const stepIdentifier = createStepIdentifier(testStepIndex, testStepContext);
    createGauge({
        name: `${caseIdentifier}_case_duration_seconds`,
        help: `Duration in seconds of case '${caseIdentifier}' on step '${stepIdentifier}'`,
        labels: {
            "step": `${stepIdentifier}`
        },
        measurement: testStepContext.duration
    });
}

export function addSuiteCriticalThresholdGauge(testSuiteContext: TestSuiteContext) {
    createGauge({
        name: `${testSuiteContext.id}_suite_critical_thresholds_seconds`,
        help: `Critical threshold for suite '${testSuiteContext.id}'`,
        measurement: testSuiteContext.criticalTime
    });
}

export function addCaseCriticalThresholdGauge(testCaseIndex: number, testCaseContext: TestContextEntity) {
    const caseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    createGauge({
        name: `${caseIdentifier}_case_critical_thresholds_seconds`,
        help: `Critical threshold for case '${caseIdentifier}'`,
        measurement: testCaseContext.criticalTime
    });
}

export function addStepCriticalThresholdGauge(testStepIndex: number, testStepContext: TestContextEntity) {
    const stepIdentifier = createStepIdentifier(testStepIndex, testStepContext);
    createGauge({
        name: `${stepIdentifier}_step_critical_thresholds_seconds`,
        help: `Critical threshold for step '${stepIdentifier}'`,
        measurement: testStepContext.criticalTime
    });
}

export function addCaseError(testSuiteContext: TestSuiteContext,
                             testCaseIndex: number,
                             testCaseContext: TestContextEntity) {
    const caseIdentifier = createCaseIdentifier(testCaseIndex, testCaseContext);
    createGauge({
        name: `${testSuiteContext.id}_suite_error`,
        help: oneLineTrim`Error state for suite '${testSuiteContext.id}' in case 
                          '${caseIdentifier}'`,
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
    createGauge({
        name: `${caseIdentifier}_case_error`,
        help: `Error state for case '${caseIdentifier}' in step '${stepIdentifier}'`,
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
    const actionIdentifier = `${addPaddingZeroes(testActionIndex)}_${testActionContext.id}`;
    createGauge({
        name: `${stepIdentifier}_step_error`,
        help: `Error state for step '${stepIdentifier}' in action '${actionIdentifier}'`,
        labels: {
            "action": `${actionIdentifier}`
        },
        measurement: 1
    });
}

function createStepIdentifier(testStepIndex: number, testStepContext: TestContextEntity){
    return `${addPaddingZeroes(testStepIndex)}_${testStepContext.id}`
}

function createCaseIdentifier(testCaseIndex: number, testCaseContext: TestContextEntity){
    return `${addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}`;
}

function  addPaddingZeroes(number: number){
    return number.toString().padStart(3, '0');
}