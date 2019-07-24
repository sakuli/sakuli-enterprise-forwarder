import { TestContextEntity } from "@sakuli/core/dist";

export type UnitOfMeasurement = '' | 's' | 'us' | 'ms' | '%' | 'B' | 'KB' | 'MB' | 'TB' | 'GB' | 'c'

export class PerfData {
    constructor(
        readonly label: string,
        readonly value: number,
        readonly unitOfMeasurment: UnitOfMeasurement = '',
        readonly warningTime?: number,
        readonly criticalTime?: number,
        readonly min?:number,
        readonly max?:number
    ) {}

}

export const toString = (data: PerfData) => {
    return `'${data.label}'=${data.value}${data.unitOfMeasurment};${data.warningTime || ''};${data.criticalTime || ''};${data.min || ''};${data.max || ''}`;
}

export const fromEntity = (entity: TestContextEntity) => {
    return new PerfData(
        `${entity.kind} ${entity.id || 'UNNAMED'}`,
        (entity.duration),
        's',
        entity.warningTime ? entity.warningTime: undefined,
        entity.criticalTime ? entity.criticalTime: undefined,
    )
}
