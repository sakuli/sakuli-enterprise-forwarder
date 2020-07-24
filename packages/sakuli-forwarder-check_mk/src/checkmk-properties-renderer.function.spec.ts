import { CheckMkForwarderProperties } from "./checkmk-forwarder-properties.class";
import { renderCheckmkProperties } from "./checkmk-properties-renderer.function";
import { stripIndents } from "common-tags";

describe("checkmk-properties-renderer", () => {
  it("should return render checkmk properties", () => {
    //GIVEN
    let checkmkProperties = new CheckMkForwarderProperties();
    checkmkProperties.enabled= true;
    checkmkProperties.spoolDir="/testdir";
    checkmkProperties.spoolfilePrefix="foo";
    checkmkProperties.freshness=0;
    checkmkProperties.piggybackHostname="localhorst";
    checkmkProperties.sectionName="";
    checkmkProperties.serviceDescription="";
    checkmkProperties.outputDetails=false;

    //WHEN
    const result = renderCheckmkProperties(checkmkProperties);

    //THEN
    expect(result).toBe(stripIndents`Checkmk Configuration:
  enabled: true
  spoolDir: /testdir
  spoolfilePrefix: foo
  freshness: 0
  piggybackHostName: localhorst
  sectionName: 
  serviceDescription: 
  outputDetails: false
  url:
   `);
  })
})