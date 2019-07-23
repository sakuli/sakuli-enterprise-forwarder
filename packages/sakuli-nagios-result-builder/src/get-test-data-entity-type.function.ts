import {TestContextEntity} from "@sakuli/core/dist";
import {ifPresent, Maybe} from "@sakuli/commons";

export const getTestDataEntityType = (entity: Maybe<TestContextEntity>) => {
    return ifPresent(entity, ({kind}) => {
        return (<Record<string, string>>{
            'suite': 'TestSuite',
            'case': 'TestCase',
            'step': 'TestCaseStep'
        })[kind] || '';
    }, () => '');
};
