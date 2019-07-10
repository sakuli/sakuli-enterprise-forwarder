import { Forwarder, Project } from "@sakuli/core";
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
            p.apiHostName = 'sakuliclient01';
            p.apiUserName = 'root';
            p.apiPassword = '0fdc1268eec4d8fe'
            return p;
        })
    });

    let logger = mockPartial<SimpleLogger>({});

    beforeEach(async () => {
        forwarder = new Icinga2Forwarder();
        await forwarder.setup(project, logger);
    })

    it('should forwader', async () => {
        await forwarder.forward(<any>null);
    })

});
