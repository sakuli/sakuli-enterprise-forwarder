import { createGauge } from "./create-gauge.function";
import { PrometheusForwarder } from "./prometheus-forwarder.class";
import { mockPartial } from "sneer";
import { Project, TestExecutionContext } from "@sakuli/core";
import { SimpleLogger } from "@sakuli/commons";
import { PrometheusForwarderProperties } from "./prometheus-properties.class";

jest.mock('./pushgateway.service');
jest.mock('./create-gauge.function');

describe("prometheus forwarder", () => {

    let prometheusForwarder: PrometheusForwarder;
    let context: TestExecutionContext;
    const {pushgatewayService} = require('./pushgateway.service');

    const defaultProject = getProjectWithProps({
        "sakuli.forwarder.prometheus.enabled": true,
        "sakuli.forwarder.prometheus.api.host": 'localhost',
        "sakuli.forwarder.prometheus.api.job": 'foo'
    });

    const logger = mockPartial<SimpleLogger>({
        info: jest.fn(),
        debug: jest.fn()
    });

    beforeEach(() => {
        prometheusForwarder = new PrometheusForwarder();
        context = new TestExecutionContext(logger);
        jest.clearAllMocks();
        pushgatewayService.mockReturnValue(mockPartial({
            push: jest.fn().mockResolvedValue("success")
        }));
    });

    it.skip("should throw in case host is not set", async () =>{
        //TODO: enable after https://github.com/sakuli/sakuli/issues/350
        //GIVEN
        const project = getProjectWithProps({
            "sakuli.forwarder.prometheus.api.job": 'foo'
        });

        //WHEN
        await expect(prometheusForwarder.setup(project, logger))
        //THEN
            .rejects.toThrowError();
    });

    it("should fallback to default if port is not set", async () =>{
        //GIVEN
        await prometheusForwarder.setup(defaultProject, logger);

        //WHEN
        await prometheusForwarder.forward(context);

        //THEN
        expect(pushgatewayService().push)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    apiPort: 9091
                }))
    });

    it.skip("should throw in case job is not set", async () =>{
        //TODO: enable after https://github.com/sakuli/sakuli/issues/350
        //GIVEN
        const project = getProjectWithProps({
            "sakuli.forwarder.prometheus.api.host": 'localhost'
        });

        //WHEN
        await expect(prometheusForwarder.setup(project, logger))
            //THEN
            .rejects.toThrowError();
    });

    it("should resolve on forward in case the forwarder is disabled", async () =>{
        //GIVEN
        const project = getProjectWithProps({
            "sakuli.forwarder.prometheus.api.host": 'localhost'
        });
        await prometheusForwarder.setup(project, logger);

        //WHEN
        let forward = prometheusForwarder.forward(context);

        //THEN
        await expect(forward).resolves.toBeUndefined();
        expect(logger.info).toBeCalledWith("Prometheus forwarding disabled via properties.");
    });

    it("should reject in case setup was not called", async () =>{

        //WHEN
        let forward = prometheusForwarder.forward(context);

        //THEN
        await expect(forward).rejects.toBe("Could not obtain project object");
    });

    it("should send metrics to prometheus", async () =>{

        //GIVEN
        await prometheusForwarder.setup(defaultProject, logger);

        //WHEN
        const forwardResult = await prometheusForwarder.forward(context);

        //THEN
        expect(pushgatewayService().push)
            .toHaveBeenCalledWith(
                expect.any(PrometheusForwarderProperties));
        expect(forwardResult).toBe("success");
    });

    it("should create gauges for suites", async () => {

        //GIVEN
        context = new TestExecutionContext(logger);
        context.startExecution();
        context.startTestSuite({id: 'Suite1'});
        context.startTestCase({id: 'Suite1Case1'});
        context.endTestCase();
        context.startTestCase({id: 'Suite1Case2'});
        context.endTestCase();
        context.endTestSuite();
        context.endExecution();
        context.startExecution();
        context.startTestSuite({id: 'Suite2'});
        context.startTestCase({id: 'Suite2Case1'});
        context.endTestCase();
        context.startTestCase({id: 'Suite2Case2'});
        context.endTestCase();
        context.endTestSuite();
        context.endExecution();
        await prometheusForwarder.setup(defaultProject, logger);

        //WHEN
        await prometheusForwarder.forward(context);

        //THEN
        expect(createGauge).toHaveBeenCalledTimes(4);
        expect(createGauge).toHaveBeenNthCalledWith(1, {
            name: "Suite1_suite_duration_seconds",
            labels: {
                "case": "000_Suite1Case1"
            },
            measurement: expect.any(Number)
        });
        expect(createGauge).toHaveBeenNthCalledWith(2, {
            name: "Suite1_suite_duration_seconds",
            labels: {
                "case": "001_Suite1Case2"
            },
            measurement: expect.any(Number)
        });
        expect(createGauge).toHaveBeenNthCalledWith(3, {
            name: "Suite2_suite_duration_seconds",
            labels: {
                "case": "000_Suite2Case1"
            },
            measurement: expect.any(Number)
        });
        expect(createGauge).toHaveBeenNthCalledWith(4, {
            name: "Suite2_suite_duration_seconds",
            labels: {
                "case": "001_Suite2Case2"
            },
            measurement: expect.any(Number)
        });
    });

    it("should create gauges for cases", async () => {

        //GIVEN
        context = new TestExecutionContext(logger);
        context.startExecution();
        context.startTestSuite({id: 'Suite1'});
        context.startTestCase({id: 'Suite1Case1'});
        context.startTestStep({id: 'Suite1Case1Step1'});
        context.endTestStep();
        context.startTestStep({id: 'Suite1Case1Step2'});
        context.endTestStep();
        context.endTestCase();
        context.endTestSuite();
        context.endExecution();
        await prometheusForwarder.setup(defaultProject, logger);

        //WHEN
        await prometheusForwarder.forward(context);

        //THEN
        expect(createGauge).toHaveBeenCalledTimes(3);
        expect(createGauge).toHaveBeenNthCalledWith(1, {
            name: "Suite1_suite_duration_seconds",
            labels: {
                "case": "000_Suite1Case1"
            },
            measurement: expect.any(Number)
        });
        expect(createGauge).toHaveBeenNthCalledWith(2, {
            name: "000_Suite1Case1_case_duration_seconds",
            labels: {
                "step": "000_Suite1Case1Step1"
            },
            measurement: expect.any(Number)
        });
        expect(createGauge).toHaveBeenNthCalledWith(3, {
            name: "000_Suite1Case1_case_duration_seconds",
            labels: {
                "step": "001_Suite1Case1Step2"
            },
            measurement: expect.any(Number)
        });
    });

    it("should add warning threshold gauges", async () => {

        //GIVEN
        context = new TestExecutionContext(logger);
        context.startExecution();
        context.startTestSuite({id: 'Suite1', warningTime: 42});
        context.startTestCase({id: 'Suite1Case1', warningTime: 21});
        context.startTestStep({id: 'Suite1Case1Step1', warningTime: 10});
        context.endTestStep();
        context.endTestCase();
        context.endTestSuite();
        context.endExecution();
        await prometheusForwarder.setup(defaultProject, logger);

        //WHEN
        await prometheusForwarder.forward(context);

        //THEN
        expect(createGauge).toHaveBeenCalledTimes(5);
        expect(createGauge).toHaveBeenNthCalledWith(1, {
            name: "Suite1_suite_warning_thresholds_seconds",
            measurement: 42
        });
        expect(createGauge).toHaveBeenNthCalledWith(2, {
            name: "000_Suite1Case1_case_warning_thresholds_seconds",
            measurement: 21
        });
        expect(createGauge).toHaveBeenNthCalledWith(4, {
            name: "000_Suite1Case1Step1_step_warning_thresholds_seconds",
            measurement: 10
        });
    });

    function getProjectWithProps(props: any){
        return mockPartial<Project>({
            has(key: string): boolean {
                return props[key] !== undefined;
            },
            get(key: string): any {
                return props[key];
            }
        })
    }
});