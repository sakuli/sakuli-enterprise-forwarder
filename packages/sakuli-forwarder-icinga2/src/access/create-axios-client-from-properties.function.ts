import { Icinga2Properties } from "../icinga2-properties.class";
import axios from 'axios';
import { Agent } from "https";
import { Maybe, SimpleLogger } from "@sakuli/commons";

/**
 * Validates the properties object and returns a new AxiosInstance if it is valid
 * @throws Error if property object is not valid
 * @param properties
 * @param logger
 */
export const createAxiosClientFromProperties = async (properties: Icinga2Properties, logger: Maybe<SimpleLogger>) => {
    logger?.debug(`Forwarding check result to Icinga2 host at ${properties.hostBaseUrl}.`);
    logger?.debug(`Username: ${properties.apiUserName}, password: ${(properties.apiPassword.length) ? '***' : 'PASSWORD EMPTY, CHECK PROPERTIES'}`);
    return axios.create({
        baseURL: properties.hostBaseUrl,
        headers: {
            'Accept': 'application/json'
        },
        httpsAgent: new Agent({
            rejectUnauthorized: false//properties.allowInsecure
        }),
        auth: {
            username: properties.apiUserName,
            password: properties.apiPassword
        }
    })
};
