jest.mock('prom-client');
import { Gauge, register } from "prom-client";
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
    const getSingleMetricMock = jest.fn();

    beforeEach(() =>{
        jest.clearAllMocks();
        Gauge.prototype.set = setMock;
        register.getSingleMetric = getSingleMetricMock;
    });

    it("should register suite warning threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestSuiteContext>({
            id: "Suite Context Mock",
            kind: "suite",
            warningTime: 42
        });

        //WHEN
        addSuiteWarningThresholdGauge(contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suite_Suite_Context_Mock_warning_thresholds_seconds",
            help: "Warning threshold for suite 'Suite_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(42);
    });

    it("should register case warning threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestCaseContext>({
            id: "Case_Context_Mock",
            kind: "case",
            warningTime: 84
        });

        //WHEN
        addCaseWarningThresholdGauge(1, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "case_001_Case_Context_Mock_warning_thresholds_seconds",
            help: "Warning threshold for case '001_Case_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(84);
    });

    it("should register step warning threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestStepContext>({
            id: "Step Context Mock",
            kind: "step",
            warningTime: 12
        });

        //WHEN
        addStepWarningThresholdGauge(0, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "step_000_Step_Context_Mock_warning_thresholds_seconds",
            help: "Warning threshold for step '000_Step_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(12);
    });

    it("should register case duration gauge", () =>{

        //GIVEN
        const suiteContextMock = mockPartial<TestSuiteContext>({
            id: "Suite Context Mock",
            kind: "suite"
        });
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "Case Context Mock",
            kind: "case"
        });

        //WHEN
        addCaseDurationGauge(suiteContextMock, 4, caseContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suite_Suite_Context_Mock_duration_seconds",
            help: "Duration in seconds of suite 'Suite_Context_Mock'",
            labelNames: ["case"]
        });
        expect(setMock).toHaveBeenCalledWith({ case: '004_Case_Context_Mock'}, expect.any(Number));
    });

    it("should register step duration gauge", () =>{

        //GIVEN
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "Case Context Mock",
            kind: "case"
        });
        const stepContextMock = mockPartial<TestStepContext>({
            id: "Step Context Mock",
            kind: "step"
        });

        //WHEN
        addStepDurationGauge(2,caseContextMock, 12, stepContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "case_002_Case_Context_Mock_duration_seconds",
            help: "Duration in seconds of case '002_Case_Context_Mock'",
            labelNames: ["step"]
        });
        expect(setMock).toHaveBeenCalledWith({ step: '012_Step_Context_Mock'}, expect.any(Number));
    });

    it("should register Suite Critical threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestSuiteContext>({
            id: "Suite Context Mock",
            kind: "suite",
            criticalTime: 99
        });

        //WHEN
        addSuiteCriticalThresholdGauge(contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suite_Suite_Context_Mock_critical_thresholds_seconds",
            help: "Critical threshold for suite 'Suite_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(99);
    });

    it("should register case critical threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestCaseContext>({
            id: "Case_Context_Mock",
            kind: "case",
            criticalTime: 45
        });

        //WHEN
        addCaseCriticalThresholdGauge(999, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "case_999_Case_Context_Mock_critical_thresholds_seconds",
            help: "Critical threshold for case '999_Case_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(45);
    });

    it("should register step critical threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestStepContext>({
            id: "Step Context Mock",
            kind: "step",
            criticalTime: 0
        });

        //WHEN
        addStepCriticalThresholdGauge(123, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "step_123_Step_Context_Mock_critical_thresholds_seconds",
            help: "Critical threshold for step '123_Step_Context_Mock'"
        });
        expect(setMock).toHaveBeenCalledWith(0);
    });

    it("should register case error", () =>{

        //GIVEN
        const suiteContextMock = mockPartial<TestSuiteContext>({
            id: "Suite Context Mock",
            kind: "suite"
        });
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "Case Context Mock",
            kind: "case"
        });

        //WHEN
        addCaseError(suiteContextMock, 1, caseContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suite_Suite_Context_Mock_error",
            help: "Error state for suite 'Suite_Context_Mock'",
            labelNames: ["case"]
        });
        expect(setMock).toHaveBeenCalledWith({case: "001_Case_Context_Mock"}, expect.any(Number));
    });

    it("should register step error", () =>{

        //GIVEN
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "Case Context Mock",
            kind: "case"
        });
        const stepContextMock = mockPartial<TestStepContext>({
            id: "Step Context Mock",
            kind: "step"
        });

        //WHEN
        addStepError(42, caseContextMock, 84, stepContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "case_042_Case_Context_Mock_error",
            help: "Error state for case '042_Case_Context_Mock'",
            labelNames: ["step"]
        });
        expect(setMock).toHaveBeenCalledWith({step: "084_Step_Context_Mock"}, expect.any(Number));
    });

    it("should register action error", () =>{

        //GIVEN
        const stepContextMock = mockPartial<TestStepContext>({
            id: "Step_Context_Mock",
            kind: "step"
        });
        const actionContextMock = mockPartial<TestActionContext>({
            id: "Action Context Mock",
            kind: "action"
        });

        //WHEN
        addActionError(999, stepContextMock, 321, actionContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "step_999_Step_Context_Mock_error",
            help: "Error state for step '999_Step_Context_Mock'",
            labelNames: ["action"]
        });
        expect(setMock).toHaveBeenCalledWith({action: "321_Action_Context_Mock"}, expect.any(Number));
    });

    it("it should throw in case the gauge name is invalid", () =>{

        //GIVEN
        const contextMock = mockPartial<TestSuiteContext>({
            id: "Suite Context Mock.",
            kind: "suite",
            warningTime: 42
        });

        //WHEN
        const gaugeCreation = () => addSuiteWarningThresholdGauge(contextMock);

        //THEN
        expect(gaugeCreation).toThrowError();
    });

    it("it should add dimension to gauge", () =>{

        //GIVEN
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "Case Context Mock",
            kind: "case"
        });
        const firstStepContextMock = mockPartial<TestStepContext>({
            id: "Step Context Mock 1",
            kind: "step"
        });
        const secondStepContextMock = mockPartial<TestStepContext>({
            id: "Step Context Mock 2",
            kind: "step"
        });
        getSingleMetricMock
            .mockReturnValueOnce(undefined)
            .mockReturnValue(mockPartial({
                set: setMock
            }));

        //WHEN
        addStepError(42, caseContextMock, 84, firstStepContextMock);
        addStepError(42, caseContextMock, 85, secondStepContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "case_042_Case_Context_Mock_error",
            help: "Error state for case '042_Case_Context_Mock'",
            labelNames: ["step"]
        });
        expect(Gauge).toHaveBeenCalledTimes(1);

        expect(setMock).toHaveBeenCalledWith({step: "084_Step_Context_Mock_1"}, expect.any(Number));
        expect(setMock).toHaveBeenCalledWith({step: "085_Step_Context_Mock_2"}, expect.any(Number));
        expect(setMock).toHaveBeenCalledTimes(2);
    });

    it("it should convert milliseconds to seconds on case", () =>{

        //GIVEN
        const suiteContextMock = mockPartial<TestSuiteContext>({
            id: "Suite Context Mock",
            kind: "suite"
        });
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "Case Context Mock",
            kind: "case",
            duration: 123456
        });

        //WHEN
        addCaseDurationGauge(suiteContextMock, 4, caseContextMock);

        //THEN
        expect(setMock).toHaveBeenCalledWith(expect.any(Object), 123);
    });

    it("it should convert milliseconds to seconds on step", () =>{

        //GIVEN
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "Case Context Mock",
            kind: "case"
        });
        const stepContextMock = mockPartial<TestStepContext>({
            id: "Step Context Mock",
            kind: "step",
            duration: 3141.59265359
        });

        //WHEN
        addStepDurationGauge(42, caseContextMock, 84, stepContextMock);

        //THEN
        expect(setMock).toHaveBeenCalledWith(expect.any(Object), 3);
    });
});