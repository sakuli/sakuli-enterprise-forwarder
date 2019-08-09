import {TestContextEntity, TestContextEntityStates} from "@sakuli/core";
import {NagiosState, NagiosStateObject} from "./nagios-state-description.interface";

export const getNagiosSuiteState = (testDataEntity: TestContextEntity): NagiosStateObject => {
    const suiteState = getNagiosStateObject(testDataEntity);
    const caseStates = testDataEntity
        .getChildren()
        .filter(child => child.kind === 'case')
        .map(getNagiosCaseState);

    let state = NagiosState.OK;
    for (const caseState of caseStates) {
        if (caseState.errorCode === NagiosState.CRITICAL.errorCode && state.errorCode < NagiosState.CRITICAL_IN_CASE.errorCode) {
            state = NagiosState.CRITICAL_IN_CASE;
        } else if (caseState.errorCode === NagiosState.WARNING.errorCode && state.errorCode < NagiosState.WARNING_IN_CASE.errorCode) {
            state = NagiosState.WARNING_IN_CASE;
        } else if (caseState.errorCode === NagiosState.WARNING_IN_STEP.errorCode && state.errorCode < NagiosState.WARNING_IN_STEP.errorCode) {
            state = NagiosState.WARNING_IN_STEP;
        } else if (caseState.errorCode === NagiosState.ERRORS.errorCode) {
            state = NagiosState.ERRORS;
        }
    }

    if (state === NagiosState.ERRORS) {
        return state;
    } else {
        return (state.errorCode < suiteState.errorCode) ? suiteState : state;
    }
};

export const getNagiosCaseState = (testDataEntity: TestContextEntity): NagiosStateObject => {
    const caseState = getNagiosStateObject(testDataEntity);
    const stepStates = testDataEntity
        .getChildren()
        .filter(child => child.kind === 'step')
        .map(getNagiosStepState);

    for (const stepState of stepStates) {
        switch (stepState.errorCode) {
            case NagiosState.CRITICAL.errorCode:
                return NagiosState.CRITICAL_IN_STEP;
            case NagiosState.WARNING.errorCode:
                return NagiosState.WARNING_IN_STEP;
            case NagiosState.ERRORS.errorCode:
                return NagiosState.ERRORS;
        }
    }

    return caseState;
};
export const getNagiosStepState = (testDataEntity: TestContextEntity): NagiosStateObject => {
    return getNagiosStateObject(testDataEntity);
};

const getNagiosStateObject = (testDataEntity: TestContextEntity): NagiosStateObject => {
    if (testDataEntity.error) {
        return NagiosState.ERRORS;
    }
    switch (testDataEntity.ownState) {
        case (TestContextEntityStates.OK):
            return NagiosState.OK;
        case (TestContextEntityStates.WARNING):
            return NagiosState.WARNING;
        case (TestContextEntityStates.CRITICAL):
            return NagiosState.CRITICAL;
        case (TestContextEntityStates.ERROR):
            return NagiosState.ERRORS;
        default:
            return NagiosState.RUNNING;
    }
};
