jest.mock('prom-client');
import { pushgatewayService } from "./pushgateway.service";
import { Pushgateway } from "prom-client";

describe("push gateway service", () => {

    const forwarderProperties = {
        enabled: true,
        apiHost: "localhorst",
        apiPort: 42,
        apiJob: "sameJobDifferentDay"
    };

    const {Pushgateway} = require("prom-client");
    const pushAddMock = jest.fn();

    beforeEach(() =>{
        jest.clearAllMocks();
        Pushgateway.prototype.pushAdd = pushAddMock;
    });

    it("should create client on push according to configuration", () =>{

        //WHEN
        pushgatewayService().push(forwarderProperties);

        //THEN
        expect(Pushgateway).toBeCalledWith(`http://${forwarderProperties.apiHost}:${forwarderProperties.apiPort}`)
    });

    it("pushes metrics to prometheus", async () =>{

        //GIVEN
        pushAddMock.mockImplementation((_, cb) => cb(undefined, "foo", "bar"));

        //WHEN
        const pushPromise = pushgatewayService().push(forwarderProperties);

        //THEN
        await expect(pushPromise).resolves.toEqual({resp: "foo", body: "bar"});
        expect(pushAddMock).toBeCalledWith({
            jobName: "sameJobDifferentDay"
        }, expect.anything());
    });

    it("rejects on push error", async () =>{

        //GIVEN
        pushAddMock.mockImplementation((_, cb) => cb("kapott", undefined, undefined));

        //WHEN
        const pushPromise = pushgatewayService().push(forwarderProperties);

        //THEN
        await expect(pushPromise).rejects.toEqual("kapott");
        expect(pushAddMock).toBeCalledWith({
            jobName: "sameJobDifferentDay"
        }, expect.anything());
    })
});