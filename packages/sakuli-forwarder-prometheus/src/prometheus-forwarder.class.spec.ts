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
import { PrometheusForwarder } from "./prometheus-forwarder.class";
import { mockPartial } from "sneer";
import { Project, TestExecutionContext } from "@sakuli/core";
import { SimpleLogger } from "@sakuli/commons";
import { PrometheusForwarderProperties } from "./prometheus-properties.class";
import { validateProps } from "@sakuli/result-builder-commons";

jest.mock("@sakuli/result-builder-commons", () => {
    const originalModule = jest.requireActual("@sakuli/result-builder-commons");

    return {
        __esModule: true,
        ...originalModule,
        validateProps: jest.fn(),
    };
});
jest.mock('./pushgateway.service');
jest.mock('./gauge.utils');

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
        debug: jest.fn(),
        error: jest.fn()
    });

    beforeEach(() => {
        prometheusForwarder = new PrometheusForwarder();
        context = new TestExecutionContext(logger);
        jest.clearAllMocks();
        pushgatewayService.mockReturnValue(mockPartial({
            push: jest.fn()
        }));
    });

    describe("properties parsing", () =>{
        it.skip("should throw in case host is not set", async () => {
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

        it("should fallback to default if port is not set", async () => {
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

        it.skip("should throw in case job is not set", async () => {
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

        it("should resolve on forward in case the forwarder is disabled", async () => {
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

        it("should not validate if props not available", async () => {
            //GIVEN
            let project = getProjectWithProps({});

            //WHEN
            await prometheusForwarder.setup(project, logger);

            //THEN
            expect(validateProps).not.toHaveBeenCalled();

        });

        it("should validate if props available", async () => {
            //GIVEN
            let project = getProjectWithProps( {
                "sakuli.forwarder.prometheus.enabled" : true
            });

            //WHEN
            await prometheusForwarder.setup(project,logger);

            //THEN
            expect(validateProps).toHaveBeenCalled();

        });

    })

    it("should reject in case setup was not called", async () => {

        //WHEN
        let forward = prometheusForwarder.forward(context);

        //THEN
        await expect(forward).rejects.toBe("Could not obtain PrometheusForwarderProperties object.");
    });

    it("should send metrics to prometheus", async () => {

        //GIVEN
        await prometheusForwarder.setup(defaultProject, logger);

        //WHEN
        await prometheusForwarder.forward(context);

        //THEN
        expect(pushgatewayService().push)
            .toHaveBeenCalledWith(
                expect.any(PrometheusForwarderProperties));
    });

    describe("gauge creation", () => {
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
            expect(addCaseDurationGauge).toHaveBeenCalledTimes(4);
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
            endContext(context);
            await prometheusForwarder.setup(defaultProject, logger);

            //WHEN
            await prometheusForwarder.forward(context);

            //THEN
            expect(addStepDurationGauge).toHaveBeenCalledTimes(2);
        });

        it("should add warning threshold gauges", async () => {

            //GIVEN
            context = new TestExecutionContext(logger);
            context.startExecution();
            context.startTestSuite({id: 'Suite1', warningTime: 42});
            context.startTestCase({id: 'Suite1Case1', warningTime: 21});
            context.startTestStep({id: 'Suite1Case1Step1', warningTime: 10});
            endContext(context);
            await prometheusForwarder.setup(defaultProject, logger);

            //WHEN
            await prometheusForwarder.forward(context);

            //THEN
            expect(addSuiteWarningThresholdGauge).toHaveBeenCalledTimes(1);
            expect(addCaseWarningThresholdGauge).toHaveBeenCalledTimes(1);
            expect(addStepWarningThresholdGauge).toHaveBeenCalledTimes(1);
        });


        it("should add critical threshold gauges", async () => {

            //GIVEN
            context = new TestExecutionContext(logger);
            context.startExecution();
            context.startTestSuite({id: 'Suite1', criticalTime: 84});
            context.startTestCase({id: 'Suite1Case1', criticalTime: 42});
            context.startTestStep({id: 'Suite1Case1Step1', criticalTime: 21});
            endContext(context);
            await prometheusForwarder.setup(defaultProject, logger);

            //WHEN
            await prometheusForwarder.forward(context);

            //THEN
            expect(addSuiteCriticalThresholdGauge).toHaveBeenCalledTimes(1);
            expect(addCaseCriticalThresholdGauge).toHaveBeenCalledTimes(1);
            expect(addStepCriticalThresholdGauge).toHaveBeenCalledTimes(1);
        });

        it("should add error gauge on case", async () => {

            //GIVEN
            context = new TestExecutionContext(logger);
            context.startExecution();
            context.startTestSuite({id: 'Suite1'});
            context.startTestCase({id: 'Suite1Case1'});
            context.updateCurrentTestCase({error: Error('stop it... NOW!!!')});
            context.startTestStep({id: 'Suite1Case1Step1'});
            endContext(context);
            await prometheusForwarder.setup(defaultProject, logger);

            //WHEN
            await prometheusForwarder.forward(context);

            //THEN
            expect(addCaseError).toHaveBeenCalledTimes(1);
            expect(addStepError).not.toHaveBeenCalled();
            expect(addActionError).not.toHaveBeenCalled();
        });

        it("should add error gauge on step", async () => {

            //GIVEN
            context = new TestExecutionContext(logger);
            context.startExecution();
            context.startTestSuite({id: 'Suite1'});
            context.startTestCase({id: 'Suite1Case1'});
            context.startTestStep({id: 'Suite1Case1Step1'});
            context.updateCurrentTestStep({error: Error('stop it... NOW!!!')});
            endContext(context);
            await prometheusForwarder.setup(defaultProject, logger);

            //WHEN
            await prometheusForwarder.forward(context);

            //THEN
            expect(addCaseError).toHaveBeenCalledTimes(1);
            expect(addStepError).toHaveBeenCalledTimes(1);
            expect(addActionError).not.toHaveBeenCalled();
        });

        it("should add error gauge on action", async () => {

            //GIVEN
            context = new TestExecutionContext(logger);
            context.startExecution();
            context.startTestSuite({id: 'Suite1'});
            context.startTestCase({id: 'Suite1Case1'});
            context.startTestStep({id: 'Suite1Case1Step1'});
            context.startTestAction({id: 'Suite1Case1Step1Action1'});
            context.updateCurrentTestAction({error: Error('stop it... NOW!!!')});
            endContext(context);
            await prometheusForwarder.setup(defaultProject, logger);

            //WHEN
            await prometheusForwarder.forward(context);

            //THEN
            expect(addCaseError).toHaveBeenCalledTimes(1);
            expect(addStepError).toHaveBeenCalledTimes(1);
            expect(addActionError).toHaveBeenCalledTimes(1);
        });

        it("should not add the last, implicit test step", async () => {

            //GIVEN
            context = new TestExecutionContext(logger);
            context.startExecution();
            context.startTestSuite({id: 'Suite1'});
            context.startTestCase({id: 'Suite1Case1'});
            context.startTestStep({id: 'regular step'});
            context.endTestStep();
            context.startTestStep(); //legacy test step - always there, never filled
            endContext(context);
            await prometheusForwarder.setup(defaultProject, logger);

            //WHEN
            await prometheusForwarder.forward(context);

            //THEN
            expect(addStepDurationGauge).toHaveBeenCalledTimes(1);
            expect(addStepCriticalThresholdGauge).toHaveBeenCalledTimes(1);
            expect(addStepCriticalThresholdGauge).toHaveBeenCalledTimes(1);
        });

        it("should add steps with empty id", async () => {

            //GIVEN
            context = new TestExecutionContext(logger);
            context.startExecution();
            context.startTestSuite({id: 'Suite1'});
            context.startTestCase({id: 'Suite1Case1'});
            context.startTestStep(); //regular test step without ID
            context.endTestStep();
            context.startTestStep(); //legacy test step - always there, never filled
            endContext(context);
            await prometheusForwarder.setup(defaultProject, logger);

            //WHEN
            await prometheusForwarder.forward(context);

            //THEN
            expect(addStepDurationGauge).toHaveBeenCalledTimes(1);
            expect(addStepCriticalThresholdGauge).toHaveBeenCalledTimes(1);
            expect(addStepCriticalThresholdGauge).toHaveBeenCalledTimes(1);
        });
    })

    function endContext(ctx: TestExecutionContext) {
        ctx.endTestStep();
        ctx.endTestCase();
        ctx.endTestSuite();
        ctx.endExecution();
    }

    function getProjectWithProps(props: any) {
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