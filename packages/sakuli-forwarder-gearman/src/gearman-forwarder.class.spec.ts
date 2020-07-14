import { GearmanForwarder } from "./gearman-forwarder.class";
import { Project, TestActionContext, TestCaseContext, TestExecutionContext, TestStepContext } from "@sakuli/core";
import { mockPartial } from "sneer";
import { SimpleLogger } from "@sakuli/commons";
import { validateProps } from "@sakuli/result-builder-commons";
import { TestSuiteContext, FinishedMeasurable} from "@sakuli/core";
import {submitJob} from './gearman/submit-job.function';

jest.mock("@sakuli/result-builder-commons", () => {
    const originalModule = jest.requireActual("@sakuli/result-builder-commons");

    return {
        __esModule: true,
        ...originalModule,
        validateProps: jest.fn(),
    };
});

jest.mock("./gearman/submit-job.function", () => ({
  submitJob: jest.fn()
}));

describe("gearman forwarder", () => {

  let gearmanForwarder: GearmanForwarder;
  let ctx: TestExecutionContext;

  const logger = mockPartial<SimpleLogger>({
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn()
  });

  const actionContextMock = new TestActionContext();
  const stepContextMock = mockPartial<TestStepContext & FinishedMeasurable>({
    getChildren: () => [actionContextMock]
  });
  const caseContextMock = mockPartial<TestCaseContext & FinishedMeasurable>({
    getChildren: () => [stepContextMock]
  });
  const suiteContextMock = mockPartial<TestSuiteContext & FinishedMeasurable>({
    getChildren: () => [caseContextMock]
  });

  function getProjectWithProps(props: any){
    return mockPartial<Project>({
      has(key: string): boolean {
        return props[key] !== undefined;
      },
      get(key: string): any {
        return props[key];
      }
    })
  }

  function endContext(ctx: TestExecutionContext) {
    ctx.endTestStep();
    ctx.endTestCase();
    ctx.endTestSuite();
    ctx.endExecution();
  }

  beforeEach(async () => {
    gearmanForwarder = new GearmanForwarder();
    ctx = new TestExecutionContext(logger);
    const project = getProjectWithProps({
      "sakuli.forwarder.gearman.enabled" : "true",
      "sakuli.forwarder.gearman.server.host": "localhorst"
    });
    await gearmanForwarder.setup(project,logger);
    ctx.startExecution();
    ctx.startTestSuite(suiteContextMock);
    ctx.startTestCase(caseContextMock);
    ctx.startTestStep(stepContextMock);
    jest.clearAllMocks();
  });

  it("should not validate props if not available", async () => {
    // GIVEN
    const project = getProjectWithProps({});

    //WHEN
    await gearmanForwarder.setup(project, logger);

    //THEN
    expect(validateProps).not.toHaveBeenCalled();
  });

  it("should forward final result", async () => {
    //GIVEN
    endContext(ctx);

    //WHEN
    await gearmanForwarder.forward(ctx)

    //THEN
    expect(logger.info).toHaveBeenCalledWith("Forwarding final result.");
    expect(submitJob).toHaveBeenCalled();
  });

  it("should forward test suite", async () => {
    // GIVEN
    ctx.endTestStep();
    ctx.endTestCase();
    ctx.endTestSuite();

    // WHEN
    await gearmanForwarder.forwardSuiteResult(suiteContextMock, ctx);

    // THEN
    expect(logger.info).toHaveBeenCalledWith("Forwarding suite result.");
    expect(submitJob).toHaveBeenCalled();
  })

  it("should forward test case", async () => {
    // GIVEN
    ctx.endTestStep();
    ctx.endTestCase();

    // WHEN
    await gearmanForwarder.forwardCaseResult(caseContextMock, ctx);

    // THEN
    expect(logger.info).toHaveBeenCalledWith("Forwarding case result.");
    expect(submitJob).toHaveBeenCalled();
  })

  it("should forward test step", async () => {
    // GIVEN
    ctx.endTestStep();

    // WHEN
    await gearmanForwarder.forwardStepResult(stepContextMock, ctx);

    // THEN
    expect(logger.info).toHaveBeenCalledWith("Forwarding step result.");
    expect(submitJob).toHaveBeenCalled();
  })
});