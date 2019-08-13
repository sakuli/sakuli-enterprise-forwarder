import {BooleanProperty, NumberProperty, Property, StringProperty} from "@sakuli/commons";
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
    @BooleanProperty('sakuli.forwarder.gearman.enabled')
    @IsBoolean()
    enabled: boolean = false;

    /**
     * Gearman hostname
     */
    @StringProperty('sakuli.forwarder.gearman.server.host')
    @IsNotEmpty()
    serverHost: string = "";

    readonly serviceType: string = 'passive';

    /**
     * Gearman port
     * DEFAULT: 4730
     */
    @NumberProperty('sakuli.forwarder.gearman.server.port')
    @IsNumber()
    serverPort: number = 4730;

    /**
     * Nagios host where all Sakuli services are defined on. If necessary, overwrite this value per test suite.
     */
    @StringProperty('sakuli.forwarder.gearman.nagios.hostname')
    @IsNotEmpty()
    nagiosHost: string = "";

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
    @BooleanProperty('sakuli.forwarder.gearman.encryption')
    @IsBoolean()
    encryption: boolean = true;

    /**
     * Secret used to encrypt data prior to forwarding
     * ATTENTION: change the secret for production use!
     */
    @StringProperty('sakuli.forwarder.gearman.secret.key')
    @ValidateIf(o => !!o.apiPassword)
    @IsNotEmpty()
    @IsString()
    secretKey: string = "sakuli_secret";

    /**
     * Nagios check command
     * Will be appended to the performance data string and will be used as PNP template name
     * DEFAULT: check_sakuli
     */
    @StringProperty('sakuli.forwarder.gearman.nagios.check_command')
    @IsNotEmpty()
    nagiosCheckCommand: string = "check_sakuli";

    /**
     * Optional service description forwarded to Nagios check result.
     * DEFAULT: testsuite.id
     */
    @StringProperty('sakuli.forwarder.gearman.nagios.service_description')
    nagiosServiceDescription: string = "";

    /**
     * Max. length for suite summary
     */
    @NumberProperty('sakuli.forwarder.gearman.nagios.template.suite.summary.maxLength')
    @IsNumber()
    nagiosTemplateSuiteSummaryMaxLength: number = 200;

    /**
     *# Screenshot dimensions in Gearman output
     */
    @NumberProperty('sakuli.forwarder.gearman.nagios.template.screenshotDivWidth')
    @IsNumber()
    nagiosTemplateScreenshotDivWidth: number = 640;

    /**
     * Boolean property to disable detailed summary in check results
     * DEFAULT: true
     */
    @BooleanProperty('sakuli.forwarder.gearman.output.details')
    @IsBoolean()
    outputDetails: boolean = true;
}