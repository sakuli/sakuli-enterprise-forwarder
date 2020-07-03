import { GearmanForwarder } from "./gearman-forwarder.class";
import { Project, TestExecutionContext } from "@sakuli/core";
import { mockPartial } from "sneer";
import { SimpleLogger } from "@sakuli/commons";
import { validateProps } from "@sakuli/result-builder-commons";

jest.mock("@sakuli/result-builder-commons", () => ({
  validateProps: jest.fn(),
}));
describe("gearman forwarder", () => {

  let gearmanForwarder: GearmanForwarder;
  let context: TestExecutionContext;

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

    //THEN
    expect(validateProps).toHaveBeenCalled();
  });

});