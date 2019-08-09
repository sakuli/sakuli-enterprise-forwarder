import {BooleanProperty, NumberProperty, Property, StringProperty} from "@sakuli/commons";
import {IsNumber, IsBoolean, IsNotEmpty} from 'class-validator'

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
    readonly enabled: boolean = false;

    /**
     * Gearman hostname
     */
    @StringProperty('sakuli.forwarder.gearman.server.host')
    @IsNotEmpty()
    readonly serverHost: string = "changeme";

    readonly serviceType: string = 'passive';

    /**
     * Gearman port
     * DEFAULT: 4730
     */
    @NumberProperty('sakuli.forwarder.gearman.server.port')
    @IsNumber()
    readonly serverPort: number = 4730;

    /**
     * Nagios host where all Sakuli services are defined on. If necessary, overwrite this value per test suite.
     */
    @StringProperty('sakuli.forwarder.gearman.nagios.hostname')
    @IsNotEmpty()
    readonly nagiosHost: string = "changeme";

    /**
     * Gearman result queue
     * DEFAULT: check_results
     */
    @StringProperty('sakuli.forwarder.gearman.server.queue')
    @IsNotEmpty()
    readonly serverQueue: string = "check_results";

    /**
     * Forward encrypted results
     * DEFAULT: true
     */
    @BooleanProperty('sakuli.forwarder.gearman.encryption')
    readonly encryption: boolean = true;

    /**
     * Secret used to encrypt data prior to forwarding
     * ATTENTION: change the secret for production use!
     */
    @StringProperty('sakuli.forwarder.gearman.secret.key')
    readonly secretKey: string = "sakuli_secret";

    /**
     * Nagios check command
     * Will be appended to the performance data string and will be used as PNP template name
     * DEFAULT: check_sakuli
     */
    @StringProperty('sakuli.forwarder.gearman.nagios.check_command')
    @IsNotEmpty()
    readonly nagiosCheckCommand: string = "check_sakuli";

    /**
     * Optional service description forwarded to Nagios check result.
     * DEFAULT: testsuite.id
     */
    @StringProperty('sakuli.forwarder.gearman.nagios.service_description')
    readonly nagiosServiceDescription: string = "";

    /**
     * Max. length for suite summary
     */
    @NumberProperty('sakuli.forwarder.gearman.nagios.template.suite.summary.maxLength')
    @IsNumber()
    readonly nagiosTemplateSuiteSummaryMaxLength: number = 200;

    /**
     *# Screenshot dimensions in Gearman output
     */
    @NumberProperty('sakuli.forwarder.gearman.nagios.template.screenshotDivWidth')
    @IsNumber()
    readonly nagiosTemplateScreenshotDivWidth: number = 640;

    /**
     * Boolean property to disable detailed summary in check results
     * DEFAULT: true
     */
    @BooleanProperty("sakuli.forwarder.check_mk.details")
    outputDetails: boolean = true;

}