import {TestContextEntityStates, TestStepContext} from "@sakuli/core";
import {renderStepCriticals} from "./render-step-criticals.function";
import {createEntity} from "./create-render-mock.function";

describe("render-step-criticals", () => {
    it("should only output steps in critical state", () => {
        // GIVEN
        const stepData = [
            {
                state: TestContextEntityStates.CRITICAL,
                id: 'crit1',
                duration: 1,
                warningTime: 1,
                criticalTime: 10
            },
            {
                state: TestContextEntityStates.CRITICAL,
                id: 'crit2',
                duration: 2,
                warningTime: 1,
                criticalTime: 10
            },
            {
                state: TestContextEntityStates.CRITICAL,
                id: 'crit3',
                duration: 3,
                warningTime: 1,
                criticalTime: 10
            },
            {
                state: TestContextEntityStates.OK,
                id: 'ok',
                duration: 4,
                warningTime: 1,
                criticalTime: 10
            }
        ];
        const steps = stepData.map(data =>
            createEntity('step', {
                state: data.state,
                id: data.id,
                warningTime: data.warningTime,
                criticalTime: data.criticalTime,
                startDate: new Date(1970, 0, 1, 10, 31, 0, 20),
                endDate: new Date(1970, 0, 1, 10, 31, 7, 20),
                duration: data.duration
            }));

        const expected = stepData
            .filter(step => step.state === TestContextEntityStates.CRITICAL)
            .map(step => `, step "${step.id}" over runtime (${step.duration.toFixed(2)}s/crit at ${step.criticalTime}s)`)
            .join("");

        // WHEN
        const result = renderStepCriticals(steps as TestStepContext[], true);

        // THEN
        expect(result).toEqual(expected);
    });

    it("should not render if shouldRender === false", () => {
        // GIVEN
        const stepData = [
            {
                state: TestContextEntityStates.CRITICAL,
                id: 'crit1',
                duration: 1,
                warningTime: 1,
                criticalTime: 10
            },
        ];
        const steps = stepData.map(data =>
            createEntity('step', {
                ownState: data.state,
                id: data.id,
                warningTime: data.warningTime,
                criticalTime: data.criticalTime,
                startDate: new Date(1970, 0, 1, 10, 31, 0, 20),
                endDate: new Date(1970, 0, 1, 10, 31, 7, 20),
                duration: data.duration
            }));

        const expected = "";

        // WHEN
        const result = renderStepCriticals(steps as TestStepContext[], false);

        // THEN
        expect(result).toEqual(expected);
    });

    it("should filter entities other than steps", () => {
        // GIVEN
        const stepData = [
            {
                state: TestContextEntityStates.CRITICAL,
                id: 'crit1',
                duration: 1,
                warningTime: 1,
                criticalTime: 10
            },
            {
                state: TestContextEntityStates.CRITICAL,
                id: 'crit2',
                duration: 2,
                warningTime: 1,
                criticalTime: 10
            },
            {
                state: TestContextEntityStates.CRITICAL,
                id: 'crit3',
                duration: 3,
                warningTime: 1,
                criticalTime: 10
            },
            {
                state: TestContextEntityStates.OK,
                id: 'ok',
                duration: 4,
                warningTime: 1,
                criticalTime: 10
            }
        ];
        const steps = stepData.map(data =>
            createEntity('case', {
                ownState: data.state,
                id: data.id,
                warningTime: data.warningTime,
                criticalTime: data.criticalTime,
                startDate: new Date(1970, 0, 1, 10, 31, 0, 20),
                endDate: new Date(1970, 0, 1, 10, 31, 7, 20),
                duration: data.duration
            }));

        // WHEN
        const result = renderStepCriticals(steps as TestStepContext[], true);

        // THEN
        expect(result).toEqual("");
    });
});