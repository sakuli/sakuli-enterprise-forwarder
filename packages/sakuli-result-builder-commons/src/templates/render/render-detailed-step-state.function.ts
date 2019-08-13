import {TestContextEntity, TestContextEntityStates, TestStepContext} from "@sakuli/core";
import {oneLineTrim} from "common-tags";
import {renderStepWarnings} from "./render-step-warnings.function";
import {renderStepCriticals} from "./render-step-criticals.function";

export const renderDetailedTestStepState = (testContextEntity: TestContextEntity): string => {
    const childWarnings = testContextEntity
        .getChildren()
        .filter(child => child.ownState === TestContextEntityStates.WARNING);
    const childCriticals = testContextEntity
        .getChildren()
        .filter(child => child.ownState === TestContextEntityStates.CRITICAL);

    const state = oneLineTrim(`
        ${renderOk(testContextEntity, childWarnings.length === 0 && childCriticals.length === 0)}
        ${renderWarning(testContextEntity, childWarnings.length === 0 && childCriticals.length === 0)}
        ${renderCritical(testContextEntity, childWarnings.length === 0 && childCriticals.length === 0)}
        ${renderStepWarnings(testContextEntity.getChildren() as TestStepContext[], childCriticals.length === 0)}
        ${renderStepCriticals(testContextEntity.getChildren() as TestStepContext[], childWarnings.length === 0)}
    `);
    return `${state} .`;
};

const renderOk = (testContextEntity: TestContextEntity, shouldRender: boolean): string => {
    if (testContextEntity.ownState === TestContextEntityStates.OK && shouldRender) {
        return `(${testContextEntity.duration.toFixed(2)}s)`
    }
    return "";
};
const renderWarning = (testContextEntity: TestContextEntity, shouldRender: boolean): string => {
    if (testContextEntity.ownState === TestContextEntityStates.WARNING && shouldRender) {
        return `(${testContextEntity.duration.toFixed(2)}s/warn at ${testContextEntity.warningTime}s)`
    }
    return "";
};
const renderCritical = (testContextEntity: TestContextEntity, shouldRender: boolean): string => {
    if (testContextEntity.ownState === TestContextEntityStates.CRITICAL && shouldRender) {
        return `(${testContextEntity.duration.toFixed(2)}s/crit at ${testContextEntity.criticalTime}s)`
    }
    return "";
};
