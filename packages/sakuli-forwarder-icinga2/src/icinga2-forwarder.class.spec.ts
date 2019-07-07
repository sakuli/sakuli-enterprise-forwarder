import { Forwarder } from "../node_modules/@sakuli/core/dist";
import { Icinga2Forwarder } from "./icinga2-forwarder.class";

describe('Icinga2Forwarder', () => {

    let forwarder: Forwarder;

    beforeEach(() => {
        forwarder = new Icinga2Forwarder();
    })

    it('should forwader', async () => {
        await forwarder.forward(<any>null, <any>null);
    })

});
