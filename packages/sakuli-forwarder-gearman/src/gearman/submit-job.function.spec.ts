import { GearmanData, submitJob } from "./submit-job.function";
import { mockPartial } from "sneer";
import { SimpleLogger } from "@sakuli/commons";
import { GearmanClient } from "gearman";
import { EventEmitter } from "events";

describe("submit gearman job", () => {
  let logger: SimpleLogger;
  let gearmanData: GearmanData;

  beforeEach(() => {
    logger = mockPartial<SimpleLogger>({
      debug: jest.fn(),
      error: jest.fn(),
      trace: jest.fn()
    });
  });

  it("should reject when client cannot connect to gearman", async () => {
    // GIVEN
    const connectionError = Error("connection error");
    gearmanData = mockPartial<GearmanData>({
      connection: mockPartial<GearmanClient>({
        connect: jest.fn(() => {throw connectionError}),
        on: jest.fn()
      })
    });

    //WHEN
    const submittedJob = submitJob(gearmanData, logger);

    // THEN
    await expect(submittedJob).rejects.toBe("Failed to connect to Gearman server.");
  });

  it("should create and close connection when submitting Job", async () => {
    // GIVEN
    let emitter = new EventEmitter();
    gearmanData = mockPartial<GearmanData>({
      connection: mockPartial<GearmanClient>({
        connect: jest.fn((cb: () => void) => {
          cb();
          emitter.emit("JOB_CREATED");
          emitter.emit("WORK_COMPLETE");
        }),
        on: jest.fn((event: string, cb: Function) => { emitter.on(event, cb as any)}),
        close: jest.fn(),
        setOption: jest.fn(),
        submitJob: jest.fn()
      }),
      checkQueue: "gearmanCheckQueue",
      payload: "gearmanPayload"
    });

    //WHEN
    const submittedJob = submitJob(gearmanData, logger)

    // THEN
    await expect(submittedJob).resolves.toBeUndefined();
    expect(gearmanData.connection.setOption).toHaveBeenCalled();
    expect(gearmanData.connection.submitJob).toHaveBeenCalledWith(gearmanData.checkQueue, gearmanData.payload, {encoding: 'utf8'})
    expect(gearmanData.connection.close).toHaveBeenCalled();
  });

  it.each(<string[]>[
    "WORK_FAIL",
    "WORK_EXCEPTION",
    "timeout",
    "error"
  ])("should close connection and reject when %s", async (event: string) => {
    // GIVEN
    const argsObject = {handle: `gearman handler ${event}`};
    let emitter = new EventEmitter();
    gearmanData = mockPartial<GearmanData>({
      connection: mockPartial<GearmanClient>({
        connect: jest.fn(() => {emitter.emit(event, argsObject)}),
        on: jest.fn((event: string, cb: Function) => { emitter.on(event, cb as any)}),
        close: jest.fn()
      })
    })

    //WHEN
    const submittedJob = submitJob(gearmanData, logger)

    // THEN
    await expect(submittedJob).rejects.toBeUndefined();
    expect(logger.error).toHaveBeenCalledWith(`Received Gearman event ${event} with following data:`, argsObject);
    expect(gearmanData.connection.close).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
})
