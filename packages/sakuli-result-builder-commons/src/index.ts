import {TestCaseContext, TestContextEntity, TestSuiteContext} from "@sakuli/core";

export * from "./check-result";
export * from "./create-entity.function";
export * from "./output";
export * from "./templates";
export * from "./validate-props.function";

export type CurrentExecutionState = {
    suiteId: string;
    caseId: string;
}

export interface OutputResultParameters {
    currentSuite?: TestSuiteContext
    currentCase?: TestCaseContext
    props: any
}

export interface TestContextOutputBuilder {
    render(testContextEntity: TestContextEntity, params: OutputResultParameters): string
}
