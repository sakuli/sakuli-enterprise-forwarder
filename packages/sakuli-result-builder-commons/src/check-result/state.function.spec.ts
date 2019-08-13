import {getShortState} from "./state.function";

describe('get-output-state', () => {
    it.each`
        inputState | expectedState
        ${0}        | ${'[OK]'}
        ${1}        | ${'[WARN]'}
        ${2}        | ${'[CRIT]'}
        ${3}        | ${'[UNKN]'}
        ${4}        | ${'[CRIT]'}
        ${null}     | ${'[UNKN]'}
    `(`should convert $inputState to $expectedState`, ({inputState, expectedState}) => {
        expect(getShortState(inputState)).toEqual(expectedState);
    })
});