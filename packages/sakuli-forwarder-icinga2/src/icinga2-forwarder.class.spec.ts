import { Forwarder, Project, TestExecutionContext } from "@sakuli/core";
import { Icinga2Forwarder } from "./icinga2-forwarder.class";
import { mockPartial } from 'sneer'
import { SimpleLogger, Type } from "@sakuli/commons";
import { Icinga2Properties } from "./icinga2-properties.class";

describe('Icinga2Forwarder', () => {

    let forwarder: Icinga2Forwarder;
    let project = mockPartial<Project>({
        objectFactory: <any>jest.fn(() => {
            const p = new Icinga2Properties();
            p.apiHost = 'https://localhost';
            p.apiPort = 5665;
            p.hostName = 'sakuliclient01';
            p.serviceDescription = 'sakuli_demo';
            p.apiUserName = 'root';
            p.apiPassword = '06974567ac6f913e'
            return p;
        })

    });

    let logger = mockPartial<SimpleLogger>({
        info: console.log.bind(console),
        debug: console.log.bind(console)
    });

    let ctx = new TestExecutionContext(logger);

    beforeEach(async () => {
        forwarder = new Icinga2Forwarder();
        await forwarder.setup(project, logger);
        ctx.startExecution()
        ctx.startTestSuite({id: 'Suite'})
        ctx.startTestCase({id: 'Case1'})
        ctx.endTestCase()
        ctx.startTestCase({id: 'Case2'})
        ctx.endTestCase()
        ctx.endTestSuite();
        ctx.endExecution()
    })

    it('should forwader', async () => {
        await forwarder.forward(ctx);
    })

});
