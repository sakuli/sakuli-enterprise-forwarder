import {Project, TestExecutionContext} from "@sakuli/core";
import {Icinga2Forwarder} from "./icinga2-forwarder.class";
import {mockPartial} from 'sneer'
import {SimpleLogger} from "@sakuli/commons";

describe('Icinga2Forwarder', () => {

    let forwarder: Icinga2Forwarder;
    const props = {
        "sakuli.forwarder.icinga2.enabled": false,
        "sakuli.forwarder.icinga2.api.host": 'https://localhost',
        "sakuli.forwarder.icinga2.api.port": 5665,
        "sakuli.forwarder.icinga2.hostname": 'sakuliclient01',
        "sakuli.forwarder.icinga2.service_description": 'sakuli_demo',
        "sakuli.forwarder.icinga2.api.username": 'root',
        "sakuli.forwarder.icinga2.api.password": '06974567ac6f913e'
    };
    let project = mockPartial<Project>({
        has(key: string): boolean {
            return (props as any)[key] !== undefined;
        },
        get(key: string): any {
            return (props as any)[key];
        }
    });

    let logger = mockPartial<SimpleLogger>({
        info: console.log.bind(console),
        debug: console.log.bind(console)
    });

    let ctx = new TestExecutionContext(logger);

    beforeEach(async () => {
        forwarder = new Icinga2Forwarder();
        await forwarder.setup(project, logger);
        ctx.startExecution();
        ctx.startTestSuite({id: 'Suite'});
        ctx.startTestCase({id: 'Case1'});
        ctx.endTestCase();
        ctx.startTestCase({id: 'Case2'});
        ctx.endTestCase();
        ctx.endTestSuite();
        ctx.endExecution();
    });

    it('should call forwad method', async () => {
        await forwarder.forward(ctx);
    })
});
