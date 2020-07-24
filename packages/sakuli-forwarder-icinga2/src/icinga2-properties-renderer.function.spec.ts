import { Icinga2Properties } from "./icinga2-properties.class";
import { stripIndents } from "common-tags";
import { renderIcinga2Properties } from "./icinga2-properties-renderer.function";

describe("icinga2-properties-renderer", () => {
  it("should return render icinga2 properties", () => {
    //GIVEN
    let icinga2Properties = new Icinga2Properties();
    icinga2Properties.enabled = true;
    icinga2Properties.allowInsecure = false;
    icinga2Properties.apiHost = "sakuli.io";
    icinga2Properties.apiPort = 5665;
    icinga2Properties.apiUserName = "root";
    icinga2Properties.apiPassword = "safePassword";
    icinga2Properties.checkCommand = "check_sakuli";
    icinga2Properties.checkSource = "check_sakuli";
    icinga2Properties.hostName = "sakuliclient";



    //WHEN
    const result = renderIcinga2Properties(icinga2Properties);

    //THEN
    expect(result).toBe(stripIndents`Icinga2 Configuration:
  enabled: true,
  allowInsecure: false,
  apiHost: sakuli.io,
  apiPort: 5665,
  apiUserName: root,
  apiPassword: safePassword,
  checkCommand: check_sakuli,
  checkSource: check_sakuli,
  hostName: sakuliclient,
  serviceDescription:
   `);
  })
})