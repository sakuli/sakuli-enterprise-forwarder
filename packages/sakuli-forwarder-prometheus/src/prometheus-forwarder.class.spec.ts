jest.mock('prom-client');
jest.mock('./pushgateway.service');
import { PrometheusForwarder } from "./prometheus-forwarder.class";
import { mockPartial } from "sneer";
import { Project, TestExecutionContext } from "@sakuli/core";
import { SimpleLogger } from "@sakuli/commons";
import { PrometheusForwarderProperties } from "./prometheus-properties.class";

describe("prometheus forwarder", () => {

    let prometheusForwarder: PrometheusForwarder;
    let context: TestExecutionContext;
    const {pushgatewayService} = require('./pushgateway.service');

    const logger = mockPartial<SimpleLogger>({
        info: jest.fn(),
        debug: jest.fn()
    });

    beforeEach(() => {
        prometheusForwarder = new PrometheusForwarder();
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

        jest.resetAllMocks();
        pushgatewayService.mockReturnValue(mockPartial({
            push: jest.fn().mockResolvedValue({})
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
        const project = getProjectWithProps({
            "sakuli.forwarder.prometheus.enabled": true,
            "sakuli.forwarder.prometheus.api.host": 'localhost',
            "sakuli.forwarder.prometheus.api.job": 'foo'
        });
        await prometheusForwarder.setup(project, logger);

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
        const project = getProjectWithProps({
            "sakuli.forwarder.prometheus.enabled": true,
            "sakuli.forwarder.prometheus.api.host": 'localhost',
            "sakuli.forwarder.prometheus.api.job": 'foo'
        });

        await prometheusForwarder.setup(project, logger);

        //WHEN
        await prometheusForwarder.forward(context);

        //THEN
        expect(pushgatewayService().push)
            .toHaveBeenCalledWith(
                expect.any(PrometheusForwarderProperties));
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