import { CheckMkForwarderProperties } from "./checkmk-forwarder-properties.class";
import { stripIndents } from "common-tags";

export const renderCheckmkProperties = (properties: CheckMkForwarderProperties) => {
  return stripIndents`Checkmk Configuration:
  enabled: ${properties.enabled}
  spoolDir: ${properties.spoolDir}
  spoolfilePrefix: ${properties.spoolfilePrefix}
  freshness: ${properties.freshness}
  piggybackHostName: ${properties.piggybackHostname}
  sectionName: ${properties.sectionName}
  serviceDescription: ${properties.serviceDescription}
  outputDetails: ${properties.outputDetails}
  url: ${properties.url}
  `
}