jest.mock('prom-client');
import { Gauge } from "prom-client";
import { mockPartial } from "sneer";
import { TestCaseContext, TestStepContext, TestSuiteContext } from "@sakuli/core";
import {
    addCaseWarningThresholdGauge,
    addStepWarningThresholdGauge,
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
    })
});