jest.mock('prom-client');
import { Gauge } from "prom-client";
import { mockPartial } from "sneer";
import { TestSuiteContext } from "@sakuli/core";
import { addSuiteWarningThresholdGauge } from "./gauge.utils";

describe("gauge utils", () => {

    const setMock = jest.fn();

    beforeEach(() =>{
        jest.clearAllMocks();
        Gauge.prototype.set = setMock;
    });

    it("should register suite warning threshold gauge", () =>{

        //GIVEN
        const contextMock = mockPartial<TestSuiteContext>({
            id: "contextMock",
            warningTime: 42
        });

        //WHEN
        addSuiteWarningThresholdGauge(contextMock);

        //THEN
        expect(Gauge).toHaveBeenCalledWith({
            name: "contextMock_suite_warning_thresholds_seconds",
            help: "Warning threshold for suite 'contextMock'"
        });
        expect(setMock).toHaveBeenCalledWith(42);
    })
});