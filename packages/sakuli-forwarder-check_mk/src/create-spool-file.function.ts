import {TestContextEntity} from "@sakuli/core";
import {CheckMkForwarderProperties} from "./checkmk-forwarder-properties.class";
import {getEntityId} from "@sakuli/result-builder-commons";

export const createSpoolFileName = (testContextEntity: TestContextEntity, properties: CheckMkForwarderProperties): string => {
    return `${properties.freshness}_${properties.spoolfilePrefix ? properties.spoolfilePrefix + "_" : ""}${getEntityId(testContextEntity)}`;
};

