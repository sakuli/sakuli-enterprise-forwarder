import {TestContextEntityStates, TestStepContext} from "@sakuli/core";

export const renderStepCriticals = (testSteps: TestStepContext[], shouldRender: boolean) => {
    return (shouldRender) ? testSteps.map((step) =>
        (step.kind === 'step' && step.state === TestContextEntityStates.CRITICAL)
            ? `, step "${step.id}" over runtime (${step.duration.toFixed(2)}s/crit at ${step.criticalTime}s)`
            : ""
    ).join("") : "";
};
