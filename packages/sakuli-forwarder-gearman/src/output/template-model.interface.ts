export interface TemplateModel {
    testDataEntityType: string;
    testSuiteId?: string;
    testCaseId?: string;
    host?: string;
    startDateAsUnixTimestamp: string;
    endDateAsUnixTimestamp: string;
    stateNagiosErrorCode: string;
}
