import { Forwarder, Project, TestExecutionContext } from "@sakuli/core";
import { validateProps } from "@sakuli/result-builder-commons";
import { createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger } from "@sakuli/commons";
import { PrometheusForwarderProperties } from "./prometheus-properties.class";
import { Gauge, Pushgateway } from 'prom-client'

export class PrometheusForwarder implements Forwarder {

    private properties: Maybe<PrometheusForwarderProperties>;
    private logger: Maybe<SimpleLogger>;

    async setup(project: Project, logger: SimpleLogger): Promise<void> {
        this.properties = createPropertyObjectFactory(project)(PrometheusForwarderProperties);
        await validateProps(this.properties);
        this.logger = logger;
    }

    logDebug(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.debug(message, ...data));
    }

    logInfo(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.info(message, ...data));
    }

    logWarn(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.warn(message, ...data));
    }

    logError(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.error(message, ...data));
    }

    forward(ctx: TestExecutionContext): Promise<any> {
        return ifPresent(this.properties, properties => {
            if(properties.enabled){
                this.logInfo(`Forwarding check result to Prometheus.`);
                return this.send(ctx, properties);
            }
            this.logInfo(`Prometheus forwarding disabled via properties.`);
            return Promise.resolve();
        },
            () => Promise.reject('Could not obtain project object'));
    }

    private addGaugeMetric(name: string, help: string, time: number, labels: Record<string, string>) {
        const gauge = new Gauge({name, help, labelNames: Object.keys(labels)});
        gauge.labels(...Object.values(labels)).set(time);
    }

    private send(ctx: TestExecutionContext, properties: PrometheusForwarderProperties) {
        const gateway = new Pushgateway(`http://${properties.apiHost}:${properties.apiPort}`);
        return Promise.resolve();
    }
}