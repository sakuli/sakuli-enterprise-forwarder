import {oneLine} from "common-tags";

export const performanceMetaData = (suiteId: string, graphType: string): string => {
    return oneLine(`
suite_${suiteId}=0;;;;
graph_type_${graphType}=0;;;;
    `)
};