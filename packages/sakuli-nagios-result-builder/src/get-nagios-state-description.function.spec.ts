import {TestSuite_OK} from "./__mocks__/test-suite-ok.entity";
import {TestSuite_ERRORS} from "./__mocks__/test-suite-error.entity";
import {TestSuite_WARNING_IN_STEP} from "./__mocks__/test-suite-warning-in-step.entity";
import {TestSuite_WARNING_IN_CASE} from "./__mocks__/test-suite-warning-in-case.entity";
import {TestSuite_WARNING_IN_SUITE} from "./__mocks__/test-suite-warning-in-suite.entity";
import {TestSuite_CRITICAL_IN_CASE} from "./__mocks__/test-suite-critical-in-case.entity";
import {TestSuite_CRITICAL_IN_SUITE} from "./__mocks__/test-suite-critical-in-suite.entity";
import {NagiosState, NagiosStateObject} from "./nagios-state-description.interface";
import {getNagiosCaseState, getNagiosStepState, getNagiosSuiteState} from "./get-nagios-state-description.function";
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

describe('getNagiosSuiteState', () => {
    it.each(<[any, NagiosStateObject][]>[
        [TestSuite_OK, NagiosState.OK],
        [TestSuite_WARNING_IN_STEP, NagiosState.WARNING_IN_STEP],
        [TestSuite_WARNING_IN_CASE, NagiosState.WARNING_IN_CASE],
        [TestSuite_WARNING_IN_SUITE, NagiosState.WARNING],
        [TestSuite_CRITICAL_IN_CASE, NagiosState.CRITICAL_IN_CASE],
        [TestSuite_CRITICAL_IN_SUITE, NagiosState.CRITICAL],
        [TestSuite_ERRORS, NagiosState.ERRORS],
    ])('should produce Nagios state description for state %s %s', (testSuiteState: any, nagiosState: NagiosStateObject) => {
        // GIVEN

        // WHEN
        const result = getNagiosSuiteState(testSuiteState);

        // THEN
        expect(result).toEqual(nagiosState);
    });
});

describe('getNagiosCaseState', () => {
    it.each(<[any, NagiosStateObject][]>[
        [TestCase_OK, NagiosState.OK],
        [TestCase_WARNING, NagiosState.WARNING],
        [TestCase_WARNING_IN_STEP, NagiosState.WARNING_IN_STEP],
        [TestCase_CRITICAL, NagiosState.CRITICAL],
        [TestCase_CRITICAL_IN_STEP, NagiosState.CRITICAL_IN_STEP],
        [TestCase_ERRORS, NagiosState.ERRORS],
    ])('should produce Nagios state description for state %s %s', (testCaseState: any, nagiosState: NagiosStateObject) => {
        // GIVEN

        // WHEN
        const result = getNagiosCaseState(testCaseState);

        // THEN
        expect(result).toEqual(nagiosState);
    });
});

describe('getNagiosStepState', () => {
    it.each(<[any, NagiosStateObject][]>[
        [TestStep_OK, NagiosState.OK],
        [TestStep_WARNING, NagiosState.WARNING],
        [TestStep_CRITICAL, NagiosState.CRITICAL],
        [TestStep_ERRORS, NagiosState.ERRORS],
    ])('should produce Nagios state description for state %s %s', (testStepState: any, nagiosState: NagiosStateObject) => {
        // GIVEN

        // WHEN
        const result = getNagiosStepState(testStepState);

        // THEN
        expect(result).toEqual(nagiosState);
    });
});
