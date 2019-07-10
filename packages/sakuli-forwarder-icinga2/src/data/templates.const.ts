export interface PluginOutputData {
    stateShort: string;
    id: string;
    suiteSummary: string;
    stopDate: string;
    duration: string;
    stateDescription: string;
}

export const suiteSummary = ({
    stateShort, id, suiteSummary, stopDate
}: PluginOutputData) => `${stateShort} Sakuli suite "${id}" ${suiteSummary}. (Last suite run: ${stopDate})`;

export const caseOk = ({
    stateShort,
    id,
    duration,
    stateDescription
}: PluginOutputData) => `${stateShort} case "${id}" ran in ${duration}s - ${stateDescription}`
