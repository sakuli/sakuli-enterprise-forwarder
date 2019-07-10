import { suiteSummary } from "./data/templates.const";
import { StringProperty, template, NumberProperty } from "@sakuli/commons";

export class Icinga2TemplateProperties {

    private readonly interpolation = /{{([\s\S]+?)}}/g;

    @StringProperty("sakuli.forwarder.icinga2.template.suite.summary")
    suiteSummary:string = '{{state_short}} Sakuli suite "{{id}}" {{suite_summary}}. (Last suite run: {{stop_date}})'

    get suiteSummaryTemplate() {
        return template(this.suiteSummary, this.interpolation);
    }

    @NumberProperty("sakuli.forwarder.icinga2.template.suite.summary.maxLength")
    suiteSummaryLength:number = 200

    @StringProperty("sakuli.forwarder.icinga2.template.case.ok")
    caseOk:string = '{{state_short}} case "{{id}}" ran in {{duration}}s - {{state_description}}'

    get caseOkTemplate() {
        return template(this.caseOk, this.interpolation);
    }

    @StringProperty("sakuli.forwarder.icinga2.template.case.warning")
    caseWarning:string = '{{state_short}} case "{{id}}" over runtime ({{duration}}s/warn at {{warning_threshold}}s){{step_information}}'

    get caseWarningTemplate() {
        return template(this.caseWarning, this.interpolation);
    }

    @StringProperty("sakuli.forwarder.icinga2.template.case.warningInStep")
    caseWarningInStep:string = '{{state_short}} case "{{id}}" over runtime ({{duration}}s/warn at {{warning_threshold}}s){{step_information}}'

    get caseWarningInStepTemplate() {
        return template(this.caseWarningInStep, this.interpolation);
    }

    @StringProperty("sakuli.forwarder.icinga2.template.case.critical")
    caseCritical:string = '{{state_short}} case "{{id}}" over runtime ({{duration}}s/crit at {{critical_threshold}}s){{step_information}}'

    get caseCriticalTemplate() {
        return template(this.caseCritical, this.interpolation)
    }

    @StringProperty("sakuli.forwarder.icinga2.template.case.error")
    caseError:string = '{{state_short}} case "{{id}}" {{state_description}}: {{error_message}}'

    get caseErrorTemplate() {
        return template(this.caseError, this.interpolation);
    }

}
