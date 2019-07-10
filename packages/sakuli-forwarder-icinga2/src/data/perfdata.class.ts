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

    toString() {
        return `'${this.label}'=${this.value.toFixed(0)}${this.unitOfMeasurment};${this.warningTime};${this.criticalTime};${this.min};${this.max}`;
    }
}
