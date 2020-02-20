import { PrometheusForwarder } from "./prometheus-forwarder.class";
import { mockPartial } from "sneer";
import { Project } from "@sakuli/core";
import { SimpleLogger } from "@sakuli/commons";
import { Pushgateway } from "prom-client";
import { createTestExecutionContextMock } from "./__mocks__";

jest.mock('prom-client');

describe("prometheus forwarder", () => {

    let prometheusForwarder: PrometheusForwarder;

    const logger = mockPartial<SimpleLogger>({
        info: jest.fn(),
        debug: jest.fn()
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

    beforeEach(() => {
       prometheusForwarder = new PrometheusForwarder();
    });

    it.skip("should throw in case host is not set", async () =>{
        //TODO: fix after https://github.com/sakuli/sakuli/issues/350
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
            "sakuli.forwarder.prometheus.api.host": 'localhost',
            "sakuli.forwarder.prometheus.api.job": 'foo'
        });

        //WHEN
        await prometheusForwarder.setup(project, logger);

        //THEN
        expect(Pushgateway).toHaveBeenCalledWith("http://localhost:9091")
    });

    it.skip("should throw in case job is not set", async () =>{
        //TODO: fix after https://github.com/sakuli/sakuli/issues/350
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
        let forward = prometheusForwarder.forward(createTestExecutionContextMock());

        //THEN
        await expect(forward).resolves.toBeUndefined();
        expect(logger.info).toBeCalledWith("Prometheus forwarding disabled via properties.");
    })
});