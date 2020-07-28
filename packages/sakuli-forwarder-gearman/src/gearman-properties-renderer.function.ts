import { GearmanForwarderProperties } from "./gearman-forwarder-properties.class";
import { stripIndents } from "common-tags";

export const renderGearmanProperties = (properties: GearmanForwarderProperties) => {
  return stripIndents`Gearman Configuration:
  enabled: ${properties.enabled},
  serverHost: ${properties.serverHost},
  serverPort: ${properties.serverPort},
  serviceType: ${properties.serviceType},
  serverQueue: ${properties.serverQueue},
  encryption: ${properties.encryption},
  secretKey: ***,
  nagiosHost: ${properties.nagiosHost},
  nagiosCheckCommand: ${properties.nagiosCheckCommand},
  nagiosServiceDescription: ${properties.nagiosServiceDescription},
  nagiosTemplateSuiteSummaryMaxLength: ${properties.nagiosTemplateSuiteSummaryMaxLength},
  nagiosTemplateScreenshotDivWidth: ${properties.nagiosTemplateScreenshotDivWidth},
  outputDetails: ${properties.outputDetails}
  `
}