import { CheckMkForwarder } from "./checkmk-forwarder.class";
import { Project, TestExecutionContext } from "@sakuli/core";
import { mockPartial } from "sneer";
import { SimpleLogger } from "@sakuli/commons";
import { validateProps } from "@sakuli/result-builder-commons";

jest.mock("@sakuli/result-builder-commons", () => ({
  validateProps: jest.fn(),
}));
describe("check-mk forwarder", () => {

  let checkmkForwarder: CheckMkForwarder;
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
    checkmkForwarder = new CheckMkForwarder();
    context = new TestExecutionContext(logger);
    jest.clearAllMocks();
  });

  it("should not validate props if not available", async () => {
    // GIVEN
    const project = getProjectWithProps({});

    //WHEN
    await checkmkForwarder.setup(project, logger);

    //THEN
    expect(validateProps).not.toHaveBeenCalled();
  });

  it("should validate props if available", async () => {
    //GIVEN
    const project = getProjectWithProps({
    "sakuli.forwarder.check_mk.enabled" : true
    });

    //WHEN
    await checkmkForwarder.setup(project,logger);

    //THEN
    expect(validateProps).toHaveBeenCalled();
  });

});
