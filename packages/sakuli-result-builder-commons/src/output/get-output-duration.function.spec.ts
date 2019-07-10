import {getOutputDuration} from "./get-output-duration.function";
import {mockPartial} from "sneer";
import {FinishedMeasurable, TestContextEntity} from "@sakuli/core";

describe('get-output-state', () => {
    it.each`
        state | startDate               | endDate                 | expected
        ${4}  | ${new Date(1519370000)} | ${new Date(1519377000)} | ${'U'}
        ${0}  | ${new Date(1519377570)} | ${new Date(1519377000)} | ${'U'}
        ${1}  | ${new Date(1519360000)} | ${new Date(1519377234)} | ${'17.23s'}
        ${1}  | ${new Date(1519360000)} | ${new Date(1519377235)} | ${'17.24s'}
    `(`should convert entity with startDate=$start, endDate=$end and state $state to $expected`, ({state, startDate, endDate, expected}) => {
        const entityMock = mockPartial<TestContextEntity & FinishedMeasurable>({
            startDate,
            endDate,
            state,
            isFinished: jest.fn(() => true)
        });
        expect(getOutputDuration(entityMock)).toEqual(expected);
    })
});