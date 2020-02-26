import { TestContextEntity, TestSuiteContext } from "@sakuli/core";

interface GaugeDefinition {
    name: string,
    labels?: Record<string, string>,
    measurement: number
}
function createGauge(gaugeDefinition: GaugeDefinition){

}

export function  addSuiteWarningGauge(testSuiteContext: TestSuiteContext) {
    createGauge({
        name: `${testSuiteContext.id}_suite_warning_thresholds_seconds`,
        measurement: testSuiteContext.warningTime
    });
}

export function  addCaseWarningThresholdGauge(testCaseIndex: number, testCaseContext: TestContextEntity) {
    createGauge({
        name: `${addPaddingZeroes(testCaseIndex)}_${testCaseContext.id}_case_warning_thresholds_seconds`,
        measurement: testCaseContext.warningTime
    });
}

export function  addStepWarningThresholdGauge(testCaseIndex: number,
                                              testStepContext: TestContextEntity,
                                              testStepIndex: number) {
    createGauge({
        name: `${addPaddingZeroes(testStepIndex)}_${testStepContext.id}_step_warning_thresholds_seconds`,
        measurement: testStepContext.warningTime
    });
}

export function  addSuiteDurationGauge(testSuiteContext: TestSuiteContext,
                                       testCaseIndex: number,
                                       testCaseContext: TestContextEntity) {
    createGauge({
        name: `${testSuiteContext.id}_suite_duration_seconds`,
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
        labels: {
            "step": `${addPaddingZeroes(testStepIndex)}_${testStepContext.id}`
        },
        measurement: testCaseContext.duration
    });
}

function  addPaddingZeroes(number: number){
    return number.toString().padStart(3, '0');
}