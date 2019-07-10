import {TestSuite_OK} from "./__mocks__/test-suite-ok.entity";
import {TestSuite_ERRORS} from "./__mocks__/test-suite-error.entity";
import {TestSuite_WARNING_IN_STEP} from "./__mocks__/test-suite-warning-in-step.entity";
import {TestSuite_WARNING_IN_CASE} from "./__mocks__/test-suite-warning-in-case.entity";
import {TestSuite_WARNING_IN_SUITE} from "./__mocks__/test-suite-warning-in-suite.entity";
import {TestSuite_CRITICAL_IN_CASE} from "./__mocks__/test-suite-critical-in-case.entity";
import {TestSuite_CRITICAL_IN_SUITE} from "./__mocks__/test-suite-critical-in-suite.entity";
import {getNagiosStepState} from "./get-nagios-state-description.function";
import {TestCase_OK} from "./__mocks__/test-case-ok.entity";
import {TestCase_WARNING_IN_STEP} from "./__mocks__/test-case-warning-in-step.entity";
import {TestCase_CRITICAL} from "./__mocks__/test-case-critical.entity";
import {TestCase_CRITICAL_IN_STEP} from "./__mocks__/test-case-critical-in-step.entity";
import {TestCase_WARNING} from "./__mocks__/test-case-warning.entity";
import {TestCase_ERRORS} from "./__mocks__/test-case-errors.entity";
import {TestStep_OK} from "./__mocks__/test-step-ok.entity";
import {TestStep_WARNING} from "./__mocks__/test-step-warning.entity";
import {TestStep_CRITICAL} from "./__mocks__/test-step-critical.entity";
import {TestStep_ERRORS} from "./__mocks__/test-step-error.entity";
import {TestContextEntityStates} from "@sakuli/core";
import {getNagiosResultState} from "./get-nagios-result-state.function";

describe('getNagiosSuiteResultState', () => {
    it.each(<[any, TestContextEntityStates][]>[
        [TestSuite_OK, TestContextEntityStates.OK],
        [TestSuite_WARNING_IN_STEP, TestContextEntityStates.WARNING],
        [TestSuite_WARNING_IN_CASE, TestContextEntityStates.WARNING],
        [TestSuite_WARNING_IN_SUITE, TestContextEntityStates.WARNING],
        [TestSuite_CRITICAL_IN_CASE, TestContextEntityStates.CRITICAL],
        [TestSuite_CRITICAL_IN_SUITE, TestContextEntityStates.CRITICAL],
        [TestSuite_ERRORS, TestContextEntityStates.CRITICAL],
    ])('should produce Nagios state for state %s %s', (testSuiteState: any, nagiosState: TestContextEntityStates) => {
        // GIVEN

        // WHEN
        const result = getNagiosResultState(testSuiteState);

        // THEN
        expect(result).toEqual(nagiosState);
    });
});

describe('getNagiosCaseResultState', () => {
    it.each(<[any, TestContextEntityStates][]>[
        [TestCase_OK, TestContextEntityStates.OK],
        [TestCase_WARNING, TestContextEntityStates.WARNING],
        [TestCase_WARNING_IN_STEP, TestContextEntityStates.WARNING],
        [TestCase_CRITICAL, TestContextEntityStates.CRITICAL],
        [TestCase_CRITICAL_IN_STEP, TestContextEntityStates.CRITICAL],
        [TestCase_ERRORS, TestContextEntityStates.CRITICAL],
    ])('should produce Nagios result state for state %s %s', (testCaseState: any, nagiosState: TestContextEntityStates) => {
        // GIVEN

        // WHEN
        const result = getNagiosResultState(testCaseState);

        // THEN
        expect(result).toEqual(nagiosState);
    });
});

describe('getNagiosStepState', () => {
    it.each(<[any, TestContextEntityStates][]>[
        [TestStep_OK, TestContextEntityStates.OK],
        [TestStep_WARNING, TestContextEntityStates.WARNING],
        [TestStep_CRITICAL, TestContextEntityStates.CRITICAL],
        [TestStep_ERRORS, TestContextEntityStates.CRITICAL],
    ])('should produce Nagios output state for state %s %s', (testStepState: any, nagiosState: TestContextEntityStates) => {
        // GIVEN

        // WHEN
        const result = getNagiosResultState(testStepState);

        // THEN
        expect(result).toEqual(nagiosState);
    });
});
