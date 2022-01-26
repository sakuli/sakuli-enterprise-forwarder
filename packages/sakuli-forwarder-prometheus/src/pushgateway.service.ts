import {PrometheusForwarderProperties} from "./prometheus-properties.class";
import {Pushgateway} from "prom-client";

interface PushGatewayResponse {
    resp?: unknown,
    body?: unknown
}

interface PushgatewayService {
    push: (properties: PrometheusForwarderProperties) => Promise<PushGatewayResponse>
}

export function pushgatewayService(): PushgatewayService{

    async function push(properties: PrometheusForwarderProperties) {
        const gateway = new Pushgateway(`http://${properties.apiHost}:${properties.apiPort}`);
        return gateway.pushAdd({ jobName: properties.apiJob });
    }

    return {
        push
    }
}