import { TestContextEntity, TestCaseContext, TestSuiteContext, TestContextEntityStates } from "@sakuli/core/dist";
import { Icinga2TemplateProperties } from "../icinga2-template-properties.class";
import { ifPresent } from "@sakuli/commons/dist";
import { objectReflection } from "@sakuli/commons/dist";

const shortStates = new Map<number, string>([
    [TestContextEntityStates.OK, '[OK]'],
    [TestContextEntityStates.WARNING, '[WARN]'],
    [TestContextEntityStates.CRITICAL, '[CRIT]'],
    [TestContextEntityStates.ERROR, '[CRIT]'],
    [TestContextEntityStates.UNKNOWN, '[UNKNW]'],
]);

/**
suite.summary={{state_short}} Sakuli suite "{{id}}" {{suite_summary}}. (Last suite run: {{stop_date}})
case.ok={{state_short}} case "{{id}}" ran in {{duration}}s - {{state_description}}
case.warning={{state_short}} case "{{id}}" over runtime ({{duration}}s/warn at {{warning_threshold}}s){{step_information}}
case.warningInStep={{state_short}} case "{{id}}" over runtime ({{duration}}s/warn at {{warning_threshold}}s){{step_information}}
case.critical={{state_short}} case "{{id}}" over runtime ({{duration}}s/crit at {{critical_threshold}}s){{step_information}}
case.error={{state_short}} case "{{id}}" {{state_description}}: {{error_message}}
 * @param entity
 * @param props
 */
export const createPluginOutput = (entity: TestContextEntity, props: Icinga2TemplateProperties): string[] => {
    const outputs: string[] = [];
    entity.state
    if(entity instanceof TestSuiteContext) {
        const suiteSummary: string = props.suiteSummaryTemplate(objectReflection({
            'state_short': shortStates.get(entity.state) || '[UNKNW]',
            'id': entity.id,
            'stop_date': ifPresent(entity.endDate, d => d.getTime().toString(), () => '')
        }));
        outputs.push(suiteSummary.substr(0, props.suiteSummaryLength))
    }
    if(entity instanceof TestCaseContext) {

    }

    return outputs;
}
