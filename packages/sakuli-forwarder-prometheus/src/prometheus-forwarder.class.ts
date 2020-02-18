import {
    FinishedMeasurable,
    Forwarder,
    Project,
    TestActionContext,
    TestCaseContext,
    TestExecutionContext,
    TestStepContext,
    TestSuiteContext
} from "@sakuli/core";
import { SimpleLogger } from "@sakuli/commons";

export class PrometheusForwarder implements Forwarder {

    forward(ctx: TestExecutionContext): Promise<any> {
        return Promise.resolve();
    }

    forwardActionResult(entity: TestActionContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    forwardCaseResult(entity: TestCaseContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    forwardStepResult(entity: TestStepContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    forwardSuiteResult(entity: TestSuiteContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    setup(project: Project, logger: SimpleLogger): Promise<void> {
        return Promise.resolve();
    }

    tearDown(): Promise<void> {
        return Promise.resolve();
    }

}