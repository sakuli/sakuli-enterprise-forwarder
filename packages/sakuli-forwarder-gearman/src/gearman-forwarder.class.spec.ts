import { GearmanForwarder } from "./gearman-forwarder.class";
import { Project, TestExecutionContext } from "@sakuli/core";
import { mockPartial } from "sneer";
import { SimpleLogger } from "@sakuli/commons";
import { validateProps } from "@sakuli/result-builder-commons";
import { TestSuiteContext, FinishedMeasurable, TestCaseContext } from "@sakuli/core";


jest.mock("@sakuli/result-builder-commons", () => {
    const originalModule = jest.requireActual("@sakuli/result-builder-commons");

    return {
        __esModule: true,
        ...originalModule,
        validateProps: jest.fn(),
    };
});

describe("gearman forwarder", () => {

  let gearmanForwarder: GearmanForwarder;
  let context: TestExecutionContext;
  let testEntity: Partial<TestCaseContext & FinishedMeasurable>;
  let suiteEntity: Partial<TestSuiteContext & FinishedMeasurable>;
  let testCaseEntity: TestCaseContext & FinishedMeasurable;
  let testSuiteEntity: TestSuiteContext & FinishedMeasurable;

  const logger = mockPartial<SimpleLogger>({
    info: jest.fn(),
    debug: jest.fn()
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

  beforeEach(() => {
    gearmanForwarder = new GearmanForwarder();
    context = new TestExecutionContext(logger);
    suiteEntity = {}
    testEntity = {};
    testCaseEntity = testEntity as TestCaseContext & FinishedMeasurable;
    testSuiteEntity = suiteEntity as TestSuiteContext & FinishedMeasurable;
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

  it("should validate props if available", async () => {
    //GIVEN
    const project = getProjectWithProps({
    "sakuli.forwarder.gearman.enabled" : "true"
    });

    //WHEN
    await gearmanForwarder.setup(project,logger);
    //await gearmanForwarder.forwardCaseResult(testCaseEntity,context);


    //THEN
    expect(validateProps).toHaveBeenCalled();
    //expect(logger.info).toHaveBeenCalledWith("Forwarding case result.")

  });

  it("should log the right info after calling forwardSuiteResult", async () => {
    //GIVEN
    const project = getProjectWithProps({
    "sakuli.forwarder.gearman.enabled" : "true"
    });

    //WHEN
    await gearmanForwarder.setup(project,logger);
    await gearmanForwarder.forwardSuiteResult(testSuiteEntity,context);

    //THEN
    expect(logger.info).toHaveBeenCalledWith("Forwarding suite result.");

  });

});