import {Icinga2Properties} from "../icinga2-properties.class";
import {createAxiosClientFromProperties} from "./create-axios-client-from-properties.function";
import {runInsecure} from "./run-insecure.function";
import {ProcessCheckResultRequest} from "./process-check-result-request.interface";
import {ifPresent, Maybe, SimpleLogger} from "@sakuli/commons";

export const createIcinga2ApiAdapter = async (
    properties: Icinga2Properties,
    logger: Maybe<SimpleLogger>
) => {
    const http = await createAxiosClientFromProperties(properties, logger);
    return ({
        processCheckResult: async (data: ProcessCheckResultRequest) => {
            if (properties.allowInsecure) {
                ifPresent(logger,
                    (log: SimpleLogger) => log.debug(`Insecure connections enabled`));
                return runInsecure(() => {
                    return http.post(`actions/process-check-result?type=service&service=${properties.hostName}!${properties.serviceDescription}`, data);
                })
            } else {
                ifPresent(logger,
                    (log: SimpleLogger) => log.debug(`Insecure connections disabled`));
                return http.post(`actions/process-check-result?type=service&service=${properties.hostName}!${properties.serviceDescription}`, data);
            }
        }
    })
};
