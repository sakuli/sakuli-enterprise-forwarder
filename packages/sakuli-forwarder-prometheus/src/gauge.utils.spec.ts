jest.mock('prom-client');
import { Gauge } from "prom-client";
import { mockPartial } from "sneer";
import { TestActionContext, TestCaseContext, TestStepContext, TestSuiteContext } from "@sakuli/core";
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

describe("gauge utils", () => {

    const setMock = jest.fn();

    beforeEach(() =>{
        jest.clearAllMocks();
        Gauge.prototype.set = setMock;
    });

    it("should register suite warning threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestSuiteContext>({
            id: "suite Context Mock",
            kind: "suite",
            warningTime: 42
        });

        //WHEN
        addSuiteWarningThresholdGauge(contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suite_Context_Mock_suite_warning_thresholds_seconds",
            help: "Warning threshold for suite 'suite_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(42);
    });

    it("should register case warning threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestCaseContext>({
            id: "case_Context_Mock",
            kind: "case",
            warningTime: 84
        });

        //WHEN
        addCaseWarningThresholdGauge(1, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "001_case_Context_Mock_case_warning_thresholds_seconds",
            help: "Warning threshold for case '001_case_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(84);
    });

    it("should register step warning threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestStepContext>({
            id: "step Context Mock",
            kind: "step",
            warningTime: 12
        });

        //WHEN
        addStepWarningThresholdGauge(0, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "000_step_Context_Mock_step_warning_thresholds_seconds",
            help: "Warning threshold for step '000_step_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(12);
    });

    it("should register case duration gauge", () =>{

        //GIVEN
        const suiteContextMock = mockPartial<TestSuiteContext>({
            id: "suite Context Mock",
            kind: "suite"
        });
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "case Context Mock",
            kind: "case",
            duration: 33
        });

        //WHEN
        addCaseDurationGauge(suiteContextMock, 4, caseContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suite_Context_Mock_suite_duration_seconds",
            help: "Duration in seconds of suite 'suite_Context_Mock' on case '004_case_Context_Mock'",
            labelNames: ["case"]
        });
        expect(setMock).toHaveBeenCalledWith({ case: '004_case_Context_Mock'}, 33);
    });

    it("should register step duration gauge", () =>{

        //GIVEN
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "case Context Mock",
            kind: "case"
        });
        const stepContextMock = mockPartial<TestStepContext>({
            id: "step Context Mock",
            kind: "step",
            duration: 66
        });

        //WHEN
        addStepDurationGauge(2,caseContextMock, 12, stepContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "002_case_Context_Mock_case_duration_seconds",
            help: "Duration in seconds of case '002_case_Context_Mock' on step '012_step_Context_Mock'",
            labelNames: ["step"]
        });
        expect(setMock).toHaveBeenCalledWith({ step: '012_step_Context_Mock'}, 66);
    });

    it("should register suite critical threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestSuiteContext>({
            id: "suite Context Mock",
            kind: "suite",
            criticalTime: 99
        });

        //WHEN
        addSuiteCriticalThresholdGauge(contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suite_Context_Mock_suite_critical_thresholds_seconds",
            help: "Critical threshold for suite 'suite_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(99);
    });

    it("should register case critical threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestCaseContext>({
            id: "case_Context_Mock",
            kind: "case",
            criticalTime: 45
        });

        //WHEN
        addCaseCriticalThresholdGauge(999, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "999_case_Context_Mock_case_critical_thresholds_seconds",
            help: "Critical threshold for case '999_case_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(45);
    });

    it("should register step critical threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestStepContext>({
            id: "step Context Mock",
            kind: "step",
            criticalTime: 0
        });

        //WHEN
        addStepCriticalThresholdGauge(123, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "123_step_Context_Mock_step_critical_thresholds_seconds",
            help: "Critical threshold for step '123_step_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(0);
    });

    it("should register case error", () =>{

        //GIVEN
        const suiteContextMock = mockPartial<TestSuiteContext>({
            id: "suite Context Mock",
            kind: "suite"
        });
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "case Context Mock",
            kind: "case"
        });

        //WHEN
        addCaseError(suiteContextMock, 1, caseContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suite_Context_Mock_suite_error",
            help: "Error state for suite 'suite_Context_Mock' in case '001_case_Context_Mock'",
            labelNames: ["case"]
        });
        expect(setMock).toHaveBeenCalledWith({case: "001_case_Context_Mock"}, 1);
    });

    it("should register step error", () =>{

        //GIVEN
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "case Context Mock",
            kind: "case"
        });
        const stepContextMock = mockPartial<TestStepContext>({
            id: "step Context Mock",
            kind: "step"
        });

        //WHEN
        addStepError(42, caseContextMock, 84, stepContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "042_case_Context_Mock_case_error",
            help: "Error state for case '042_case_Context_Mock' in step '084_step_Context_Mock'",
            labelNames: ["step"]
        });
        expect(setMock).toHaveBeenCalledWith({step: "084_step_Context_Mock"}, 1);
    });

    it("should register action error", () =>{

        //GIVEN
        const stepContextMock = mockPartial<TestStepContext>({
            id: "step_Context_Mock",
            kind: "step"
        });
        const actionContextMock = mockPartial<TestActionContext>({
            id: "action Context Mock",
            kind: "action"
        });

        //WHEN
        addActionError(999, stepContextMock, 321, actionContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "999_step_Context_Mock_step_error",
            help: "Error state for step '999_step_Context_Mock' in action '321_action_Context_Mock'",
            labelNames: ["action"]
        });
        expect(setMock).toHaveBeenCalledWith({action: "321_action_Context_Mock"}, 1);
    });
});