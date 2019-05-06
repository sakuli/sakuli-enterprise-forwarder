import { Property } from "@sakuli/commons";

/**
 *######################################################################################
 * FORWARDER-PROPERTIES
 *
 * Defines the properties for all forwarders. Currently supported: JDBC, Gearman/mod-gearman, Icinga, CheckMK.
 *######################################################################################
 */
export class GearmanForwarderProperties {
    /**
     * Set the default folder, where the Twig templates for the different forwarders are placed
     * (e.g. the Check_MK templates are placed in a subdirectory check_mk).
     * For more information about twig templates, please refer to http://jtwig.org/
     */
    @Property('sakuli.forwarder.template.folder')
    readonly templateFolder: string = "${sakuli.home.folder}/config/templates";

    /**
     * #### GEARMAN - FORWARDER
     * Send results to a gearman-enabled monitoring system, using the parameters below in your 'sakuli.properties' to activate the forwarder.
     * For more information see https://github.com/ConSol/sakuli/blob/master/docs/forwarder-gearman.md
     *
     * # Gearman server settings:
     * DEFAULT: false
     */
    @Property('sakuli.forwarder.gearman.enabled')
    readonly enabled: boolean = false;

    /**

     */
    @Property('sakuli.forwarder.gearman.server.host')
    readonly serverHost: string = "changeme";

    readonly serviceType: string = 'passive'

    /**
     * DEFAULT: 4730
     */
    @Property('sakuli.forwarder.gearman.server.port')
    readonly serverPort: number = 4730;

    /**
     * Nagios host where all Sakuli services are defined on. If necessary, overwrite this value per test suite.
     */
    @Property('sakuli.forwarder.gearman.nagios.hostname')
    readonly nagiosHost: string = "changeme";

    /**
     *
     *
     *## OPTIONAL GEARMAN PROPERTIES:
     * DEFAULT: check_results
     */
    @Property('sakuli.forwarder.gearman.server.queue')
    readonly serverQueue: string = "check_results";

    /**
     *
     *# Encryption:
     * For serverside configuration see https://labs.consol.de/de/nagios/mod-gearman/index.html.
     */
    @Property('sakuli.forwarder.gearman.encryption')
    readonly encryption: boolean = true;

    /**
     * ATTENTION: change the secret for production use!!!
     */
    @Property('sakuli.forwarder.gearman.secret.key')
    readonly secretKey: string = "sakuli_secret";

    /**
     *
     * Result caching:
     * Caches results when gearman server is temporarily not available.
     */
    @Property('sakuli.forwarder.gearman.cache.enabled')
    readonly cacheEnabled: boolean = true;

    /**
     * Time in milliseconds to wait between result job submit (used when processing cached results)
     */
    @Property('sakuli.forwarder.gearman.job.interval')
    readonly jobInterval: number = 1000;

    /**
     *
     * Nagios service options:
     * check_command gets appended to the perfdata string and will be used as PNP template name (check_sakuli = default)
     */
    @Property('sakuli.forwarder.gearman.nagios.check_command')
    readonly nagiosCheckCommand: string = "check_sakuli";

    /**
     * optional service description forwarded to nagios check result. DEFAULT: testsuite.id
     */
    @Property('sakuli.forwarder.gearman.nagios.service_description')
    readonly nagiosServiceDescription: string = "${testsuite.id}";

    /**
     *
     * Result template:
     * Output message template strings. Change only if needed.
     */
    @Property('sakuli.forwarder.gearman.nagios.template.suite.summary')
    readonly nagiosTemplateSuiteSummary: string = "{{state_short}} Sakuli suite \"{{id}}\" {{suite_summary}}. (Last suite run: {{stop_date}})";

    /**

     */
    @Property('sakuli.forwarder.gearman.nagios.template.suite.summary.maxLength')
    readonly nagiosTemplateSuiteSummaryMaxLength: number = 200;

    /**

     */
    @Property('sakuli.forwarder.gearman.nagios.template.suite.table')
    readonly nagiosTemplateSuiteTable: string = "{{state_short}} Sakuli suite \"{{id}}\" {{suite_summary}}. (Last suite run: {{stop_date}}){{error_screenshot}}";

    /**

     */
    @Property('sakuli.forwarder.gearman.nagios.template.case.ok')
    readonly nagiosTemplateCaseOk: string = "{{state_short}} case \"{{id}}\" ran in {{duration}}s - {{state_description}}";

    /**

     */
    @Property('sakuli.forwarder.gearman.nagios.template.case.warning')
    readonly nagiosTemplateCaseWarning: string = "{{state_short}} case \"{{id}}\" over runtime ({{duration}}s/warn at {{warning_threshold}}s){{step_information}}";

    /**

     */
    @Property('sakuli.forwarder.gearman.nagios.template.case.warningInStep')
    readonly nagiosTemplateCaseWarningInStep: string = "{{state_short}} case \"{{id}}\" over runtime ({{duration}}s/warn at {{warning_threshold}}s){{step_information}}";

    /**

     */
    @Property('sakuli.forwarder.gearman.nagios.template.case.critical')
    readonly nagiosTemplateCaseCritical: string = "{{state_short}} case \"{{id}}\" over runtime ({{duration}}s/crit at {{critical_threshold}}s){{step_information}}";

    /**

     */
    @Property('sakuli.forwarder.gearman.nagios.template.case.error')
    readonly nagiosTemplateCaseError: string = "{{state_short}} case \"{{id}}\" {{state_description}}: {{error_message}}{{error_screenshot}}";

    /**
     *# Screenshot dimensions in Gearman output
     */
    @Property('sakuli.forwarder.gearman.nagios.template.screenshotDivWidth')
    readonly nagiosTemplateScreenshotDivWidth: number = 640;

}