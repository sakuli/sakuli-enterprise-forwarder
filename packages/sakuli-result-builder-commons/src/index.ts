import {TestCaseContext, TestContextEntity, TestSuiteContext} from "@sakuli/core";

export * from "./output";
export * from "./create-entity.function";

export interface OutputResultParameters {
    currentSuite?: TestSuiteContext
    currentCase?: TestCaseContext
    props: any
}

export interface TestContextOutputBuilder {
    render(testContextEntity: TestContextEntity, params: OutputResultParameters): string
}
