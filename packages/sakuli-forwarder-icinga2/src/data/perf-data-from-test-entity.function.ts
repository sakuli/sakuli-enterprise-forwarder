import { TestContextEntity } from "@sakuli/core/dist";
import { PerfData } from "./perfdata.class";

export const perfDataFromTestEntity = (e: TestContextEntity): PerfData => {
    return new PerfData(
        e.id || 'UNNAMED',
        e.duration,
        'ms',
        e.warningTime,
        e.criticalTime
    )
}
