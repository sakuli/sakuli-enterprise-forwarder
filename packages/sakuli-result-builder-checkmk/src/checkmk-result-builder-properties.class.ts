import { BooleanProperty, Maybe, StringProperty } from '@sakuli/commons'
import { IsBoolean, IsString } from 'class-validator'

export class CheckMkResultBuilderProperties {

    /**
     * Hostname for piggyback check results (<<<<YOUR_HOSTNAME_HERE>>>>)
     */
    @StringProperty("sakuli.forwarder.check_mk.piggyback_hostname")
    @IsString()
    piggybackHostname: Maybe<string>;

    /**
     * Name of the reported section (<<<YOUR_SECTION_NAME>>>)
     * DEFAULT: local
     */
    @StringProperty("sakuli.forwarder.check_mk.section_name")
    @IsString()
    sectionName: string = "local";

    /**
     * optional service description forwarded to the output check result, when not set, testsuite.id is used
     */
    @StringProperty("sakuli.forwarder.check_mk.service_description")
    @IsString()
    serviceDescription: string = "";

    /**
     * Boolean property to disable detailed summary in check results
     * DEFAULT: true
     */
    @BooleanProperty("sakuli.forwarder.check_mk.output.details")
    @IsBoolean()
    outputDetails: boolean = true;
}
