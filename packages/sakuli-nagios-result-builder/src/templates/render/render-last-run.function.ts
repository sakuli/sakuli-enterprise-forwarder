import {TestContextEntity} from "@sakuli/core";
import dateFormat = require("dateformat");

export const renderLastRun = (testContextEntity: TestContextEntity): string => {
    if (!testContextEntity.isFinished()) {
        return "xx"
    }
    return dateFormat(testContextEntity.endDate, "dd.mm.yy HH:MM:ss");
};