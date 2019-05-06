import { TwingFunction } from "twing";

export const getTestDataEntityType = new TwingFunction('getTestDataEntityType', (entity: {kind: string} | null) => {
    if(entity != null && 'kind' in  entity) {
        return (<Record<string, string>>{
            'suite': 'TestSuite',
            'case': 'TestCase',
            'step': 'TestCaseStep'
        })[entity.kind] || '';
    }
    return '';
});