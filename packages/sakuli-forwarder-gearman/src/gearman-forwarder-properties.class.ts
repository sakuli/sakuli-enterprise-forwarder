import {Property} from "@sakuli/commons";
import {IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateIf} from 'class-validator'

/**
 *######################################################################################
 * Properties for Gearman forwarder
 *######################################################################################
 */
export class GearmanForwarderProperties {
    /**
     * Disable or enable Gearman based forwarding
     * DEFAULT: false
     */
    @Property('sakuli.forwarder.gearman.enabled')
    @IsBoolean()
    enabled: boolean = false;

    /**
     * Gearman hostname
     */
    @Property('sakuli.forwarder.gearman.server.host')
    @IsNotEmpty()
    serverHost: string = "changeme";

    readonly serviceType: string = 'passive';

    /**
     * Gearman port
     * DEFAULT: 4730
     */
    @Property('sakuli.forwarder.gearman.server.port')
    @IsNumber()
    serverPort: number = 4730;

    /**
     * Nagios host where all Sakuli services are defined on. If necessary, overwrite this value per test suite.
     */
    @Property('sakuli.forwarder.gearman.nagios.hostname')
    @IsNotEmpty()
    nagiosHost: string = "changeme";

    /**
     * Gearman result queue
     * DEFAULT: check_results
     */
    @Property('sakuli.forwarder.gearman.server.queue')
    @IsNotEmpty()
    serverQueue: string = "check_results";

    /**
     * Forward encrypted results
     * DEFAULT: true
     */
    @Property('sakuli.forwarder.gearman.encryption')
    @IsBoolean()
    encryption: boolean = true;

    /**
     * Secret used to encrypt data prior to forwarding
     * ATTENTION: change the secret for production use!
     */
    @Property('sakuli.forwarder.gearman.secret.key')
    @ValidateIf(o => !!o.apiPassword)
    @IsNotEmpty()
    @IsString()
    secretKey: string = "sakuli_secret";

    /**
     * Nagios check command
     * Will be appended to the performance data string and will be used as PNP template name
     * DEFAULT: check_sakuli
     */
    @Property('sakuli.forwarder.gearman.nagios.check_command')
    @IsNotEmpty()
    nagiosCheckCommand: string = "check_sakuli";

    /**
     * Optional service description forwarded to Nagios check result.
     * DEFAULT: testsuite.id
     */
    @Property('sakuli.forwarder.gearman.nagios.service_description')
    nagiosServiceDescription: string = "";

    /**
     * Max. length for suite summary
     */
    @Property('sakuli.forwarder.gearman.nagios.template.suite.summary.maxLength')
    @IsNumber()
    nagiosTemplateSuiteSummaryMaxLength: number = 200;

    /**
     *# Screenshot dimensions in Gearman output
     */
    @Property('sakuli.forwarder.gearman.nagios.template.screenshotDivWidth')
    @IsNumber()
    nagiosTemplateScreenshotDivWidth: number = 640;

    /**
     * Boolean property to disable detailed summary in check results
     * DEFAULT: true
     */
    @Property('sakuli.forwarder.gearman.output.details')
    @IsBoolean()
    outputDetails: boolean = true;
}