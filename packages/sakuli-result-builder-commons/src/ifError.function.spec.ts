import { TestExecutionContext } from "@sakuli/core";
import { mockPartial } from "sneer";
import { SimpleLogger } from "@sakuli/commons";
import { ifError } from "./ifError.function";

describe('if error', () => {

    const logger = mockPartial<SimpleLogger>({
        info: jest.fn(),
        debug: jest.fn()
    });

    it("should execute the callback in case the context is in Error state", () => {

        //GIVEN
        const context = new TestExecutionContext(logger);
        context.startExecution();
        context.startTestSuite({id: 'Suite1'});
        context.updateCurrentTestSuite({error: Error('stop it... NOW!!!')});
        context.endTestSuite();
        context.endExecution();

        const callback = jest.fn();

        //WHEN
        ifError(context.testSuites[0], () => callback());

        //THEN
        expect(callback).toHaveBeenCalled();
    });

    it("should skip the callback in case the context is not in Error state", () => {

        //GIVEN
        const context = new TestExecutionContext(logger);
        context.startExecution();
        context.startTestSuite({id: 'Suite1'});
        context.endTestSuite();
        context.endExecution();

        const callback = jest.fn();

        //WHEN
        ifError(context.testSuites[0], () => callback());

        //THEN
        expect(callback).not.toHaveBeenCalled();
    })

});