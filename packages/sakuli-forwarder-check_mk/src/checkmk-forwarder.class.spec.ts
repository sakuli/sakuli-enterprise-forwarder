import { Project, TestExecutionContext } from "@sakuli/core";
import { SimpleLogger } from "@sakuli/commons";
import { mockPartial } from "sneer";
import { CheckMkForwarder } from "./checkmk-forwarder.class";
import { dirExists } from "./dir-exists.function";
import {promises as fs} from "fs";
import { cwd } from "process";

jest.mock("./create-spool-file.function", () => ({
    createSpoolFileName : jest.fn(() => { return "spoolFileName" })
}));

jest.mock("./dir-exists.function", () => ({
    dirExists : jest.fn()
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true)
}));

fs.writeFile = jest.fn()
    .mockImplementationOnce(() => {})
    .mockImplementationOnce(() => { throw new Error(); });

describe("checkmk forwarder", () => {
  let context: TestExecutionContext;
  let checkMkForwarder: CheckMkForwarder;

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

  function endContext(ctx: TestExecutionContext){
      ctx.endTestStep();
      ctx.endTestCase();
      ctx.endTestSuite();
      ctx.endExecution();
  }

  beforeEach(() => {
    checkMkForwarder = new CheckMkForwarder();
    context = new TestExecutionContext(logger);
    jest.clearAllMocks();
  });

  it("should reject when properties are not present", async () => {
    await expect(checkMkForwarder.forward(context)).rejects.toThrowError();
  });

  it("should give depub message when props disabled", async () => {
    //GIVEN
    const project = getProjectWithProps({
        "sakuli.forwarder.check_mk.enabled" : false
    });
    await checkMkForwarder.setup(project,logger);

    //WHEN
    await checkMkForwarder.forward(context);

    //THEN
    expect(logger.debug).toBeCalledWith(`CheckMK forwarding disabled via properties.`);

  });

  it("should resolve when properties are present", async () => {

      //GIVEN
      const project = getProjectWithProps({
          "sakuli.forwarder.check_mk.enabled" : true,
          "sakuli.forwarder.check_mk.spooldir" : "spoolFilePath"
      });
      await checkMkForwarder.setup(project,logger);
      context.startExecution();
      context.startTestSuite({id: 'Suite1'});
      context.startTestCase({id: 'Suite1Case1'});
      context.startTestStep({id: 'Suite1Case1Step1'});
      endContext(context);

      //WHEN
      await checkMkForwarder.forward(context);

      //THEN
      expect(logger.info).toBeCalledWith(`Forwarding final result to checkmk via spool file 'spoolFileName' in 'spoolFilePath'.`);
      expect(dirExists).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();
    });

  it("should warn when spool directory does not exist", async () => {

      //GIVEN
      const project = getProjectWithProps({
          "sakuli.forwarder.check_mk.enabled" : true,
          "sakuli.forwarder.check_mk.spooldir" : "spoolFilePath"
      });
      await checkMkForwarder.setup(project,logger);
      context.startExecution();
      context.startTestSuite({id: 'Suite1'});
      context.startTestCase({id: 'Suite1Case1'});
      context.startTestStep({id: 'Suite1Case1Step1'});
      endContext(context);

      //WHEN
      await checkMkForwarder.forward(context);

      //THEN
      expect(logger.info).toBeCalledWith(`Forwarding final result to checkmk via spool file 'spoolFileName' in 'spoolFilePath'.`);
      expect(dirExists).toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(`spool directory 'spoolFilePath' does not exists, skipping checkmk forwarding.`);
      
  });

  it("should throw an error if writing file does fail", async () => {

      //GIVEN
      const errorPath = `${cwd()}/spoolFilePath/spoolFileName`;
      const project = getProjectWithProps({
          "sakuli.forwarder.check_mk.enabled" : true,
          "sakuli.forwarder.check_mk.spooldir" : "spoolFilePath"
      });
      await checkMkForwarder.setup(project,logger);
      context.startExecution();
      context.startTestSuite({id: 'Suite1'});
      context.startTestCase({id: 'Suite1Case1'});
      context.startTestStep({id: 'Suite1Case1Step1'});
      endContext(context);

      //WHEN
      await checkMkForwarder.forward(context);

      //THEN
      expect(logger.info).toBeCalledWith(`Forwarding final result to checkmk via spool file 'spoolFileName' in 'spoolFilePath'.`);
      expect(dirExists).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(`Failed to write to '${errorPath}'. Reason:`, new Error());
    });


});
