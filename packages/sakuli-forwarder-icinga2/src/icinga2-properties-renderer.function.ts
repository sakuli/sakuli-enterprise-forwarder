import { Icinga2Properties } from "./icinga2-properties.class";
import { stripIndent } from "common-tags";

export const renderIcinga2Properties = (properties: Icinga2Properties) => {
  return stripIndent`Icinga2 Configuration:
  enabled: ${properties.enabled},
  allowInsecure: ${properties.allowInsecure},
  apiHost: ${properties.apiHost},
  apiPort: ${properties.apiPort},
  apiUserName: ${properties.apiUserName},
  apiPassword: ${properties.apiPassword},
  checkCommand: ${properties.checkCommand},
  checkSource: ${properties.checkSource},
  hostName: ${properties.hostName},
  serviceDescription: ${properties.serviceDescription}
  `;
}