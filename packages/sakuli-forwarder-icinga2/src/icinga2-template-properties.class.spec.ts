import { Icinga2TemplateProperties } from "./icinga2-template-properties.class";

describe('Icinga2TemplateProperties', () => {

    const props = new Icinga2TemplateProperties();
    it('should create templates', () => {
        expect(props.caseCriticalTemplate).toEqual(expect.any(Function))
        expect(props.suiteSummaryTemplate).toEqual(expect.any(Function))
        expect(props.caseErrorTemplate).toEqual(expect.any(Function))
        expect(props.caseOkTemplate).toEqual(expect.any(Function))
        expect(props.caseWarningInStepTemplate).toEqual(expect.any(Function))
        expect(props.caseWarningTemplate).toEqual(expect.any(Function))
    })

})
