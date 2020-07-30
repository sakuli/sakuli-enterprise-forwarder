import { PrometheusForwarderProperties } from "./prometheus-properties.class";
import { renderPrometheusProperties } from "./prometheus-properties-renderer.function";
import { stripIndents } from "common-tags";

describe("prometheus-properties-renderer", () => {
  it("should return rendered prometheus properties", () => {
    //GIVEN
    const prometheusProperties = new PrometheusForwarderProperties();
    prometheusProperties.enabled = true;
    prometheusProperties.apiHost = "sakuli.io";
    prometheusProperties.apiJob = "pushgateway";

    //WHEN
    const result = renderPrometheusProperties(prometheusProperties);

    //THEN
    expect(result).toBe(stripIndents`Prometheus Forwarder Configuration:
    enabled: true,
    apiHost: sakuli.io,
    apiPort: 9091,
    apiJob: pushgateway
    `);
  })
})