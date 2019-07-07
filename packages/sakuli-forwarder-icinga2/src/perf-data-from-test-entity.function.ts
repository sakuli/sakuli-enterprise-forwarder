import { TestContextEntity } from "../node_modules/@sakuli/core/dist";
import { PerfData } from "./perfdata.class";

export const pefDataFromTestEntity = (e: TestContextEntity): PerfData => {
    return new PerfData(
        e.id || 'UNNAMED',
        e.duration,
        'ms',
        e.warningTime,
        e.criticalTime
    )
}
