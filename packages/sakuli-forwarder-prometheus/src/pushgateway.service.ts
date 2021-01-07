import { PrometheusForwarderProperties } from "./prometheus-properties.class";
import { Pushgateway } from "prom-client";

interface PushGatewayResponse {
    resp: any,
    body: any
}

interface PushgatewayService {
    push: (properties: PrometheusForwarderProperties) => Promise<PushGatewayResponse>
}

function handlePushGatewayResponse (res: (value: (PromiseLike<PushGatewayResponse> | PushGatewayResponse))=> void, rej: (reason?: any) => void) {
    return (err: Error | undefined, resp: any, body: any) => {
        if (err) {
            rej(err);
        } else {
            res({resp, body});
        }
    };
}

export function pushgatewayService(): PushgatewayService{

    function push(properties: PrometheusForwarderProperties) {
        const gateway = new Pushgateway(`http://${properties.apiHost}:${properties.apiPort}`);
        return new Promise<PushGatewayResponse>((res, rej) => {
            gateway.pushAdd({
                    jobName: properties.apiJob
                },
              handlePushGatewayResponse(res, rej));
        });
    }

    return {
        push
    }
}