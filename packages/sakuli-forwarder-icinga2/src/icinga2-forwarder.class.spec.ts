import {Project, TestExecutionContext} from "@sakuli/core";
import {Icinga2Forwarder} from "./icinga2-forwarder.class";
import {mockPartial} from 'sneer'
import {SimpleLogger} from "@sakuli/commons";
import {validateProps} from "@sakuli/result-builder-commons";
import { renderIcinga2Properties } from "./icinga2-properties-renderer.function";

const processCheckResultMock = jest.fn();

jest.mock("./access/create-icinga2-api-adapter.function", () => ({
    createIcinga2ApiAdapter: () => new Promise((res) => { res({
        processCheckResult: processCheckResultMock
    })})
}));

jest.mock("./data/create-plugin-output.function", () => ({
    createPluginOutput: jest.fn(() => [])
}))

jest.mock("./data/create-performance-data.function", () => ({
    createPerformanceData: jest.fn(() => [])
}))

jest.mock("@sakuli/result-builder-commons", () => {
    const originalModule = jest.requireActual("@sakuli/result-builder-commons");

    return {
        __esModule: true,
        ...originalModule,
        validateProps: jest.fn(),
    };
});

jest.mock("./icinga2-properties-renderer.function", () => ({
    renderIcinga2Properties: jest.fn()
}))

describe('Icinga2Forwarder', () => {


    let forwarder: Icinga2Forwarder;

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
    
    let logger = mockPartial<SimpleLogger>({
        info: jest.fn(),
        debug: jest.fn()
    });

    let ctx = new TestExecutionContext(logger);

    async function setupDefaultProject(defaultProps : Object ={
        "sakuli.forwarder.icinga2.enabled": true
    }){
        const project = getProjectWithProps(defaultProps);
        await forwarder.setup(project,logger);
        ctx.startExecution();
        ctx.startTestSuite({id: 'Suite'});
        ctx.startTestCase({id: 'Case1'});
        ctx.endTestCase();
        ctx.startTestCase({id: 'Case2'});
        ctx.endTestCase();
        ctx.endTestSuite();
        ctx.endExecution();
    }

    beforeEach(async () => {
        forwarder = new Icinga2Forwarder();
        jest.clearAllMocks();
    });

    it("should not validate props if not available", async () => {
        //GIVEN
        await setupDefaultProject({});

        //THEN
        expect(validateProps).not.toHaveBeenCalled();
        expect(renderIcinga2Properties).toHaveBeenCalled();
    });

    it("should validate props if available", async () => {
        //GIVEN
        await setupDefaultProject();

        //THEN
        expect(validateProps).toHaveBeenCalled();

    });

    it("should not forward results when properties disabled", async () => {
        //GIVEN
        await setupDefaultProject({
            "sakuli.forwarder.icinga2.enabled": false
        });

        //WHEN
        await forwarder.forward(ctx);

        //THEN
        expect(logger.info).toHaveBeenCalledWith("Icinga2 forwarding disabled via properties.");

    });

    it("should forward results when properties enabled", async () => {
        //GIVEN
        await setupDefaultProject();

        //WHEN
        await forwarder.forward(ctx);

        //THEN
        expect(logger.info).toHaveBeenCalledWith("Forwarding check result to Icinga2.");
        expect(processCheckResultMock).toHaveBeenCalled();
    });

});
