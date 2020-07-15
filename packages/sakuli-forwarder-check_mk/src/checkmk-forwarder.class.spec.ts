import { CheckMkForwarder } from "./checkmk-forwarder.class";
import { Project, TestExecutionContext } from "@sakuli/core";
import { mockPartial } from "sneer";
import { SimpleLogger } from "@sakuli/commons";
import { validateProps } from "@sakuli/result-builder-commons";
import { dirExists } from "./dir-exists.function";
import { promises as fs } from "fs";
import { cwd } from "process";
import {join} from "path";

jest.mock("@sakuli/result-builder-commons", () => {
    const originalModule = jest.requireActual("@sakuli/result-builder-commons");

    return {
        __esModule: true,
        ...originalModule,
        validateProps: jest.fn(),
    };
});

jest.mock("./create-spool-file.function", () => ({
  createSpoolFileName: jest.fn(() => {
    return "spoolFileName"
  })
}));

jest.mock("./dir-exists.function", () => ({
  dirExists: jest.fn()
}));

describe("check-mk forwarder", () => {

  let checkmkForwarder: CheckMkForwarder;
  let context: TestExecutionContext;

  const logger = mockPartial<SimpleLogger>({
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
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

    async function setupDefaultProject() {
    await checkmkForwarder.setup(getProjectWithProps({
      "sakuli.forwarder.check_mk.enabled" : true,
      "sakuli.forwarder.check_mk.spooldir": "spoolFilePath"
    }), logger);
    context.startExecution();
    context.startTestSuite({id: 'Suite1'});
    context.startTestCase({id: 'Suite1Case1'});
    context.startTestStep({id: 'Suite1Case1Step1'});
    endContext(context);
  }

  function endContext(ctx: TestExecutionContext) {
    ctx.endTestStep();
    ctx.endTestCase();
    ctx.endTestSuite();
    ctx.endExecution();
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

  it("should reject when properties are not present", async () => {
    await expect(checkmkForwarder.forward(context)).rejects.toThrowError();
  });

  it("should resolve when properties are disabled", async () => {
    //GIVEN
    const project = getProjectWithProps({
      "sakuli.forwarder.check_mk.enabled": false
    });
    await checkmkForwarder.setup(project, logger);

    //WHEN
    await checkmkForwarder.forward(context);

    //THEN
    expect(logger.info).toBeCalledWith(`CheckMK forwarding disabled via properties.`);

  });

  it("should resolve when properties are enabled", async () => {
    //GIVEN
    (<jest.Mock>dirExists).mockReturnValueOnce(true);
    fs.writeFile = jest.fn()
      .mockImplementationOnce(() => {});
    await setupDefaultProject();

    //WHEN
    await checkmkForwarder.forward(context);

    //THEN
    expect(logger.info).toBeCalledWith(`Forwarding final result to checkmk via spool file 'spoolFileName' in 'spoolFilePath'.`);
    expect(fs.writeFile).toHaveBeenCalled();
  });

  it("should warn when spool directory does not exist", async () => {

    //GIVEN
    (<jest.Mock>dirExists).mockReturnValueOnce(false);
    await setupDefaultProject()
    //WHEN
    await checkmkForwarder.forward(context);

    //THEN
    expect(validateProps).toHaveBeenCalled();
      expect(logger.info).toBeCalledWith(`Forwarding final result to checkmk via spool file 'spoolFileName' in 'spoolFilePath'.`);expect(logger.warn).toHaveBeenCalledWith(`spool directory 'spoolFilePath' does not exists, skipping checkmk forwarding.`);
  });

  it("should throw an error if writing file does fail", async () => {

    //GIVEN
    (<jest.Mock>dirExists).mockReturnValueOnce(true);
    const errorPath = join(cwd(), "spoolFilePath", "spoolFileName");
    fs.writeFile = jest.fn()
      .mockImplementationOnce(() => {throw Error()});
    await setupDefaultProject();

    //WHEN
    await checkmkForwarder.forward(context);

    //THEN
    expect(logger.error).toHaveBeenCalledWith(`Failed to write to '${errorPath}'. Reason:`, new Error());
  });

});
