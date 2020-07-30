import { PrometheusForwarderProperties } from "./prometheus-properties.class";
import { stripIndents } from "common-tags";

export const renderPrometheusProperties = (properties: PrometheusForwarderProperties) => {
  return stripIndents`Prometheus Forwarder Configuration:
  enabled: ${properties.enabled},
  apiHost: ${properties.apiHost},
  apiPort: ${properties.apiPort},
  apiJob: ${properties.apiJob}
  `
}