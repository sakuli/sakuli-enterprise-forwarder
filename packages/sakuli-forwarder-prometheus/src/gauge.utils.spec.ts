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
            id: "suiteContextMock",
            warningTime: 42
        });

        //WHEN
        addSuiteWarningThresholdGauge(contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suiteContextMock_suite_warning_thresholds_seconds",
            help: "Warning threshold for suite 'suiteContextMock'"
        });
        expect(setMock).toHaveBeenCalledWith(42);
    });

    it("should register case warning threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestCaseContext>({
            id: "caseContextMock",
            warningTime: 84
        });

        //WHEN
        addCaseWarningThresholdGauge(1, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "001_caseContextMock_case_warning_thresholds_seconds",
            help: "Warning threshold for case '001_caseContextMock'"
        });
        expect(setMock).toHaveBeenCalledWith(84);
    });

    it("should register step warning threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestStepContext>({
            id: "stepContextMock",
            warningTime: 12
        });

        //WHEN
        addStepWarningThresholdGauge(0, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "000_stepContextMock_step_warning_thresholds_seconds",
            help: "Warning threshold for step '000_stepContextMock'"
        });
        expect(setMock).toHaveBeenCalledWith(12);
    });

    it("should register case duration gauge", () =>{

        //GIVEN
        const suiteContextMock = mockPartial<TestSuiteContext>({
            id: "suiteContextMock"
        });
        const caseContextMock = mockPartial<TestSuiteContext>({
            id: "caseContextMock",
            duration: 33
        });

        //WHEN
        addCaseDurationGauge(suiteContextMock, 4, caseContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suiteContextMock_suite_duration_seconds",
            help: "Duration in seconds of suite 'suiteContextMock' on case 'caseContextMock'",
            labelNames: ["case"]
        });
        expect(setMock).toHaveBeenCalledWith({ case: '004_caseContextMock'}, 33);
    });

    it("should register step duration gauge", () =>{

        //GIVEN
        const caseContextMock = mockPartial<TestSuiteContext>({
            id: "caseContextMock"
        });
        const stepContextMock = mockPartial<TestSuiteContext>({
            id: "stepContextMock",
            duration: 66
        });

        //WHEN
        addStepDurationGauge(2,caseContextMock, 12, stepContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "002_caseContextMock_case_duration_seconds",
            help: "Duration in seconds of case '002_caseContextMock' on step '012_stepContextMock'",
            labelNames: ["step"]
        });
        expect(setMock).toHaveBeenCalledWith({ step: '012_stepContextMock'}, 66);
    });

    it("should register suite critical threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestSuiteContext>({
            id: "suiteContextMock",
            criticalTime: 99
        });

        //WHEN
        addSuiteCriticalThresholdGauge(contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suiteContextMock_suite_critical_thresholds_seconds",
            help: "Critical threshold for suite 'suiteContextMock'"
        });
        expect(setMock).toHaveBeenCalledWith(99);
    });

    it("should register case critical threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestCaseContext>({
            id: "caseContextMock",
            criticalTime: 45
        });

        //WHEN
        addCaseCriticalThresholdGauge(999, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "999_caseContextMock_case_critical_thresholds_seconds",
            help: "Critical threshold for case '999_caseContextMock'"
        });
        expect(setMock).toHaveBeenCalledWith(45);
    });

    it("should register step critical threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestStepContext>({
            id: "stepContextMock",
            criticalTime: 0
        });

        //WHEN
        addStepCriticalThresholdGauge(123, contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "123_stepContextMock_step_critical_thresholds_seconds",
            help: "Critical threshold for step '123_stepContextMock'"
        });
        expect(setMock).toHaveBeenCalledWith(0);
    });

    it("should register case error", () =>{

        //GIVEN
        const suiteContextMock = mockPartial<TestSuiteContext>({
            id: "suiteContextMock",
        });
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "caseContextMock",
            error: Error("oh noes!")
        });

        //WHEN
        addCaseError(suiteContextMock, 1, caseContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "suiteContextMock_suite_error",
            help: "Error state for suite 'suiteContextMock' in case '001_caseContextMock'",
            labelNames: ["case"]
        });
        expect(setMock).toHaveBeenCalledWith({case: "001_caseContextMock"}, 1);
    });

    it("should register step error", () =>{

        //GIVEN
        const caseContextMock = mockPartial<TestCaseContext>({
            id: "caseContextMock"
        });
        const stepContextMock = mockPartial<TestStepContext>({
            id: "stepContextMock",
            error: Error("oh noes!")
        });

        //WHEN
        addStepError(42, caseContextMock, 84, stepContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "042_caseContextMock_case_error",
            help: "Error state for case '042_caseContextMock' in step '084_stepContextMock'",
            labelNames: ["step"]
        });
        expect(setMock).toHaveBeenCalledWith({step: "084_stepContextMock"}, 1);
    });

    it("should register action error", () =>{

        //GIVEN
        const stepContextMock = mockPartial<TestStepContext>({
            id: "stepContextMock"
        });
        const actionContextMock = mockPartial<TestActionContext>({
            id: "actionContextMock"
        });

        //WHEN
        addActionError(999, stepContextMock, 321, actionContextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "999_stepContextMock_step_error",
            help: "Error state for step '999_stepContextMock' in action '321_actionContextMock'",
            labelNames: ["action"]
        });
        expect(setMock).toHaveBeenCalledWith({action: "321_actionContextMock"}, 1);
    });
});