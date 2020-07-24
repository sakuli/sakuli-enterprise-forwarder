import { GearmanForwarderProperties } from "./gearman-forwarder-properties.class";
import { renderGearmanProperties } from "./gearman-properties-renderer.function";
import { stripIndents } from "common-tags";

describe("gearman-properties-renderer", () => {
  it("should return render checkmk properties", () => {
    //GIVEN
    let gearmanProperties = new GearmanForwarderProperties();
    gearmanProperties.enabled=true;
    gearmanProperties.serverHost="sakuli.io";
    gearmanProperties.serverPort=1234;
    gearmanProperties.nagiosHost="sakuli_client";
    gearmanProperties.encryption=true;
    gearmanProperties.secretKey="sakuli_secret";
    gearmanProperties.nagiosCheckCommand="check_sakuli";
    gearmanProperties.nagiosServiceDescription="service_description"
    gearmanProperties.nagiosTemplateSuiteSummaryMaxLength=150;
    gearmanProperties.nagiosTemplateScreenshotDivWidth=640;
    gearmanProperties.outputDetails=true;

    //WHEN
    const result = renderGearmanProperties(gearmanProperties);

    //THEN
    expect(result).toBe(stripIndents`Gearman Configuration:
  enabled: true,
  serverHost: sakuli.io,
  serverPort: 1234,
  serviceType: passive,
  serverQueue: check_results,
  encryption: true,
  secretKey: sakuli_secret,
  nagiosHost: sakuli_client,
  nagiosCheckCommand: check_sakuli,
  nagiosServiceDescription: service_description,
  nagiosTemplateSuiteSummaryMaxLength: 150,
  nagiosTemplateScreenshotDivWidth: 640,
  outputDetails: true
   `);
  })
})