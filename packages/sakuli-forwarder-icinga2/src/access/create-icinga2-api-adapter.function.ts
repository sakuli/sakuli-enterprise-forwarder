import { Icinga2Properties } from "../icinga2-properties.class";
import { AxiosInstance } from "axios";
import { createAxiosClientFromProperties } from "./create-axios-client-from-properties.function";
import { runInsecure } from "./run-insecure.function";
import { ProcessCheckResultRequest } from "./process-check-result-request.interface";

export const createIcinga2ApiAdapter = async (
    properties: Icinga2Properties,
) => {
    const http = await createAxiosClientFromProperties(properties);
    return ({
        processCheckResult: async (data: ProcessCheckResultRequest) => runInsecure(() => {
            return http.post(`actions/process-check-result?type=host&host=${properties.apiHostName}`, data);
        })
    })
}

