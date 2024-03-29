import { BooleanProperty, NumberProperty, StringProperty } from '@sakuli/commons'
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CheckMkForwarderProperties {

    /**
     * Send results to a CheckMK-enabled monitoring system, using the parameters below in your 'sakuli.properties' to activate the forwarder.
     */
    @BooleanProperty("sakuli.forwarder.check_mk.enabled")
    @IsBoolean()
    enabled: boolean = false;

    /**
     * spool dir, default /var/lib/check_mk_agent/spool (Linux) / (installation_path)\spool (Windows)
     */
    @StringProperty("sakuli.forwarder.check_mk.spooldir")
    @IsString()
    @IsNotEmpty()
    spoolDir: string = '/var/lib/check_mk_agent/spool';

    /**
     * Max result age. Prepend this number on the file name, e.g. 600_sakuli_suite_XYZ
     */
    @NumberProperty("sakuli.forwarder.check_mk.freshness")
    @IsNumber()
    freshness: number = 600;

    /**
     * Prefix of the spool file name for CheckMK
     */
    @StringProperty("sakuli.forwarder.check_mk.spoolfile_prefix")
    spoolfilePrefix: string = "sakuli_suite";

    /**
     * Hostname for piggyback check results (<<<<YOUR_HOSTNAME_HERE>>>>)
     */
    @StringProperty("sakuli.forwarder.check_mk.piggyback_hostname")
    @IsString()
    piggybackHostname: string = "";

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

    @StringProperty("sakuli.forwarder.check_mk.url")
    @IsString()
    url: string = "";
}
