import {TestContextEntityStates, TestStepContext} from "@sakuli/core";

export const renderStepWarnings = (testSteps: TestStepContext[], shouldRender: boolean) => {
    return (shouldRender) ? testSteps.map((step) =>
        (step.kind === 'step' && step.ownState === TestContextEntityStates.WARNING)
            ? `, step "${step.id}" over runtime (${step.duration.toFixed(2)}s/warn at ${step.warningTime}s)`
            : ""
    ).join("") : "";
};
