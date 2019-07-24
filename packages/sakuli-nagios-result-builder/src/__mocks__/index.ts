import {TestCase_CRITICAL} from "./test-case-critical.entity";
import {TestCase_CRITICAL_IN_STEP} from "./test-case-critical-in-step.entity";
import {TestCase_ERRORS} from "./test-case-errors.entity";
import {TestCase_OK} from "./test-case-ok.entity";
import {TestCase_WARNING} from "./test-case-warning.entity";
import {TestCase_WARNING_IN_STEP} from "./test-case-warning-in-step.entity";
import {TestStep_CRITICAL} from "./test-step-critical.entity";
import {TestStep_ERRORS} from "./test-step-error.entity";
import {TestStep_OK} from "./test-step-ok.entity";
import {TestStep_WARNING} from "./test-step-warning.entity";
import {TestSuite_CRITICAL_IN_CASE} from "./test-suite-critical-in-case.entity";
import {TestSuite_CRITICAL_IN_SUITE} from "./test-suite-critical-in-suite.entity";
import {TestSuite_ERRORS} from "./test-suite-error.entity";
import {TestSuite_OK} from "./test-suite-ok.entity";
import {TestSuite_WARNING_IN_CASE} from "./test-suite-warning-in-case.entity";
import {TestSuite_WARNING_IN_STEP} from "./test-suite-warning-in-step.entity";
import {TestSuite_WARNING_IN_SUITE} from "./test-suite-warning-in-suite.entity";
import {TestContextEntity} from '@sakuli/core'

export const Entities: Record<string, TestContextEntity> = {
    TestSuite_CRITICAL_IN_CASE,
    TestSuite_CRITICAL_IN_SUITE,
    TestSuite_ERRORS,
    TestSuite_OK,
    TestSuite_WARNING_IN_CASE,
    TestSuite_WARNING_IN_STEP,
    TestSuite_WARNING_IN_SUITE,
    TestCase_CRITICAL,
    TestCase_CRITICAL_IN_STEP,
    TestCase_ERRORS,
    TestCase_OK,
    TestCase_WARNING,
    TestCase_WARNING_IN_STEP,
    TestStep_CRITICAL,
    TestStep_ERRORS,
    TestStep_OK,
    TestStep_WARNING,
};

export const TestSuites = {
    TestSuite_CRITICAL_IN_CASE,
    TestSuite_CRITICAL_IN_SUITE,
    TestSuite_OK,
    TestSuite_WARNING_IN_CASE,
    TestSuite_WARNING_IN_STEP,
    TestSuite_WARNING_IN_SUITE,
};

export const TestCases = {
    TestCase_CRITICAL,
    TestCase_CRITICAL_IN_STEP,
    TestCase_OK,
    TestCase_WARNING,
    TestCase_WARNING_IN_STEP,
};

export const TestSteps = {
    TestStep_CRITICAL,
    TestStep_OK,
    TestStep_WARNING,
};
