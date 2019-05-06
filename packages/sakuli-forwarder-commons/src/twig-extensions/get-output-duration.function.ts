import { TwingFunction } from "twing";

export const getOutputDuration = new TwingFunction('getOutputDuration', (entity: {startDate: Date, endDate: Date, state: number}) =>{
    //const {startDate, endDate, state} = entity;
    const UNKNOWN_DURATION = 'U';

    if(entity == null || entity.state === 4 || entity.endDate.getTime() < entity.startDate.getTime()) {
        return UNKNOWN_DURATION;
    } else {
        const {startDate, endDate} = entity;
        return `${((endDate.getTime() - startDate.getTime() + .0000001) / 1000).toFixed(2)}s`
    }
})