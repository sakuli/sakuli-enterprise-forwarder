import { TestContextEntity, TestSuiteContext } from "@sakuli/core";
import { Gauge } from "prom-client";

interface GaugeDefinition {
    name: string,
    help: string
    labels?: Record<string, string>,
    measurement: number
}
function createGauge(gaugeDefinition: GaugeDefinition){
    const gauge = new Gauge({
        name: gaugeDefinition.name,
        help: gaugeDefinition.help
    });

    gauge.set(gaugeDefinition.measurement);
}

export function  addSuiteWarningThresholdGauge(testSuiteContext: TestSuiteContext) {
    createGauge({
        name: `${testSuiteContext.id}_suite_warning_thresholds_seconds`,
        help: `Warning threshold for suite '${testSuiteContext.id}'`,
        measurement: testSuiteContext.warningTime
    });
}

export function  addCaseWarningThresholdGauge(testCaseIndex: number, testCaseContext: TestContextEntity) {
    createGauge({
        name: `${addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}_case_warning_thresholds_seconds`,
        help: `Warning threshold for case '${addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}'`,
        measurement: testCaseContext.warningTime
    });
}

export function  addStepWarningThresholdGauge(testStepIndex: number, testStepContext: TestContextEntity) {
    createGauge({
        name: `${addPaddingZeroes(testStepIndex)}_${testStepContext.id}_step_warning_thresholds_seconds`,
        help: `Warning threshold for step '${addPaddingZeroes(testStepIndex)}_${testStepContext.id}'`,
        measurement: testStepContext.warningTime
    });
}

export function  addCaseDurationGauge(testSuiteContext: TestSuiteContext,
                                      testCaseIndex: number,
                                      testCaseContext: TestContextEntity) {
    createGauge({
        name: `${testSuiteContext.id}_suite_duration_seconds`,
        help: `Duration in seconds of suite ${testSuiteContext.id}`,
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
    createGauge({
        name: `${addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}_case_duration_seconds`,
        help: `Duration in seconds of step ${addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}`,
        labels: {
            "step": `${addPaddingZeroes(testStepIndex)}_${testStepContext.id}`
        },
        measurement: testCaseContext.duration
    });
}

export function addSuiteCriticalThresholdGauge(testSuiteContext: TestSuiteContext) {

}

export function addCaseCriticalThresholdGauge(testCaseIndex: number, testCaseContext: TestContextEntity) {

}

export function addStepCriticalThresholdGauge(testStepIndex: number, testStepContext: TestContextEntity) {

}

export function addSuiteError(testSuiteContext: TestSuiteContext) {

}

export function addCaseError(testCaseIndex: number, testCaseContext: TestContextEntity) {

}

export function addStepError(testStepIndex: number, testStepContext: TestContextEntity) {

}

function  addPaddingZeroes(number: number){
    return number.toString().padStart(3, '0');
}