
export interface GaugeDefinition {
    name: string,
    labels?: Record<string, string>,
    measurement: number
}
export function createGauge(gaugeDefinition: GaugeDefinition){

}