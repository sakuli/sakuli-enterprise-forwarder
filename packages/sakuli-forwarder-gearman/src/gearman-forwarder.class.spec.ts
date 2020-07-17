import { GearmanForwarder } from "./gearman-forwarder.class";
import { Project, TestCaseContext, TestExecutionContext, TestStepContext } from "@sakuli/core";
import { mockPartial } from "sneer";
import { SimpleLogger } from "@sakuli/commons";
import { validateProps } from "@sakuli/result-builder-commons";
import { TestSuiteContext, FinishedMeasurable} from "@sakuli/core";
import {submitJob} from './gearman/submit-job.function';
import {encrypt} from './crypto/aes-crypto.function';

jest.mock("@sakuli/result-builder-commons", () => {
    const originalModule = jest.requireActual("@sakuli/result-builder-commons");

    return {
        __esModule: true,
        ...originalModule,
        validateProps: jest.fn(),
    };
});

jest.mock("./crypto/aes-crypto.function", () => ({
  encrypt: jest.fn()
}));

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

  function endExecution(){
    ctx.endTestStep();
    ctx.endTestCase();
    ctx.endTestSuite();
    ctx.endExecution();
  }

  beforeEach(async () => {
    gearmanForwarder = new GearmanForwarder();
    ctx = new TestExecutionContext(logger);
    jest.clearAllMocks();
  });

  async function setupDefaultProject(){
    const project = getProjectWithProps({
      "sakuli.forwarder.gearman.enabled" : true,
      "sakuli.forwarder.gearman.server.host": "localhorst",
      "sakuli.forwarder.gearman.encryption": false
    });
    await gearmanForwarder.setup(project,logger);
  }

  function startExecution(){
    ctx.startExecution();
    ctx.startTestSuite({id: "testSuite"});
    ctx.startTestCase({id: "testCase"});
    ctx.startTestStep({id: "testStep"});
  }



  it("should not validate props if not available", async () => {
    // GIVEN
    const project = getProjectWithProps({});

    //WHEN
    await gearmanForwarder.setup(project, logger);

    //THEN
    expect(validateProps).not.toHaveBeenCalled();
  });

  it("should forward final result when test execution ends", async () => {
    //GIVEN
    await setupDefaultProject();
    startExecution();
    endExecution();

    //WHEN
    await gearmanForwarder.forward(ctx)

    //THEN
    expect(logger.info).toHaveBeenCalledWith("Forwarding final result.");
    expect(encrypt).not.toHaveBeenCalled();
    expect(submitJob).toHaveBeenCalled();
  });

  it("should forward results when test suite execution ends", async () => {
    // GIVEN
    await setupDefaultProject();
    startExecution();
    ctx.endTestStep();
    ctx.endTestCase();
    ctx.endTestSuite();

    // WHEN
    await gearmanForwarder.forwardSuiteResult(ctx.testSuites[0] as TestSuiteContext & FinishedMeasurable, ctx);

    // THEN
    expect(logger.info).toHaveBeenCalledWith("Forwarding suite result.");
    expect(encrypt).not.toHaveBeenCalled();
    expect(submitJob).toHaveBeenCalled();
  })

  it("should forward results when test case execution ends", async () => {
    // GIVEN
    await setupDefaultProject();
    startExecution();
    ctx.endTestStep();
    ctx.endTestCase();

    // WHEN
    await gearmanForwarder.forwardCaseResult(ctx.testCases[0] as TestCaseContext & FinishedMeasurable, ctx);

    // THEN
    expect(logger.info).toHaveBeenCalledWith("Forwarding case result.");
    expect(encrypt).not.toHaveBeenCalled();
    expect(submitJob).toHaveBeenCalled();
  })

  it("should forward results when test step execution ends", async () => {
    // GIVEN
    await setupDefaultProject();
    startExecution();
    ctx.endTestStep();

    // WHEN
    await gearmanForwarder.forwardStepResult(ctx.testSteps[0] as TestStepContext & FinishedMeasurable, ctx);

    // THEN
    expect(logger.info).toHaveBeenCalledWith("Forwarding step result.");
    expect(encrypt).not.toHaveBeenCalled();
    expect(submitJob).toHaveBeenCalled();
  })

  it("should call the encrypt function when properties.encryption is enabled", () => {
    //GIVEN
    const project = getProjectWithProps({
      "sakuli.forwarder.gearman.enabled" : true,
      "sakuli.forwarder.gearman.server.host": "localhorst",
      "sakuli.forwarder.gearman.encryption": true
    })
    gearmanForwarder.setup(project,logger);
    startExecution();
    endExecution();

    //WHEN
    gearmanForwarder.forward(ctx);

    //THEN
    expect(encrypt).toHaveBeenCalled();

  })

  it("should not forward test step results when forwarder is disabled", () => {
    //GIVEN
    const project = getProjectWithProps({
      "sakuli.forwarder.gearman.enabled" : false
    })
    gearmanForwarder.setup(project,logger);
    startExecution();
    ctx.endTestStep();

    //WHEN
    gearmanForwarder.forwardStepResult(ctx.testSteps[0] as TestStepContext & FinishedMeasurable, ctx);

    //THEN
    expect(logger.info).toHaveBeenCalledWith("Gearman forwarding disabled via properties.")
  })

  it("should not forward test case results when forwarder is disabled", () => {
    //GIVEN
    const project = getProjectWithProps({
      "sakuli.forwarder.gearman.enabled" : false
    })
    gearmanForwarder.setup(project,logger);
    startExecution();
    ctx.endTestStep();
    ctx.endTestCase();

    //WHEN
    gearmanForwarder.forwardCaseResult(ctx.testCases[0] as TestCaseContext & FinishedMeasurable, ctx);

    //THEN
    expect(logger.info).toHaveBeenCalledWith("Gearman forwarding disabled via properties.")
  })

  it("should not forward test suite results when forwarder is disabled", () => {
    //GIVEN
    const project = getProjectWithProps({
      "sakuli.forwarder.gearman.enabled" : false
    })
    gearmanForwarder.setup(project,logger);
    startExecution();
    ctx.endTestStep();
    ctx.endTestCase();
    ctx.endTestSuite();

    //WHEN
    gearmanForwarder.forwardSuiteResult(ctx.testSuites[0] as TestSuiteContext & FinishedMeasurable, ctx);

    //THEN
    expect(logger.info).toHaveBeenCalledWith("Gearman forwarding disabled via properties.")
  })

  it("should not forward test results when forwarder is disabled", () => {
    //GIVEN
    const project = getProjectWithProps({
      "sakuli.forwarder.gearman.enabled" : false
    })
    gearmanForwarder.setup(project,logger);
    startExecution();
    endExecution();

    //WHEN
    gearmanForwarder.forward(ctx);

    //THEN
    expect(logger.info).toHaveBeenCalledWith("Gearman forwarding disabled via properties.")
  })

});