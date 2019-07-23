import {TestContextEntity} from "@sakuli/core";

export const getOutputDuration = (entity: TestContextEntity) => {
    const UNKNOWN_DURATION = 'U';

    if (entity.state === 4 || !entity.startDate || !entity.endDate || entity.endDate.getTime() < entity.startDate.getTime()) {
        return UNKNOWN_DURATION;
    } else {
        const {startDate, endDate} = entity;
        return `${((endDate!.getTime() - startDate!.getTime() + .0000001) / 1000).toFixed(2)}s`
    }
};