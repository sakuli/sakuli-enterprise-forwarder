import { Project, TestExecutionContext } from "@sakuli/core";
import { SimpleLogger } from "@sakuli/commons";
import { mockPartial } from "sneer";
import { CheckMkForwarder } from "./checkmk-forwarder.class";

describe("checkmk forwarder", () => {
  let context: TestExecutionContext;
  let checkMkForwarder: CheckMkForwarder;

  const logger = mockPartial<SimpleLogger>({
    info: jest.fn(),
    debug: jest.fn()
  });

  const defaultProject = getProjectWithProps({
    "sakuli.forwarder.checkmk.enabled": true
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
    checkMkForwarder = new CheckMkForwarder();
    context = new TestExecutionContext(logger);
    jest.clearAllMocks();
  });

  it("should reject when properties are not present", async () => {
    await expect(checkMkForwarder.forward(context)).rejects.toThrowError();
  });
});