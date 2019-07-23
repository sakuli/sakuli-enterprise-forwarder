import { Icinga2Properties } from "../icinga2-properties.class";
import axios from 'axios';
import { Agent } from "https";
import { validate } from "class-validator";

/**
 * Validates the properties object and returns a new AxiosInstance if it is valid
 * @throws Error if property object is not valid
 * @param properties
 */
export const createAxiosClientFromProperties = async (properties: Icinga2Properties) => {
    const errors = await validate(properties);
    if (errors.length) {
        throw Error(errors.map(e => e.toString()).join("\n"))
    }
    return axios.create({
        baseURL: properties.hostBaseUrl,
        headers: {
            'Accept': 'application/json'
        },
        httpsAgent: new Agent({
            rejectUnauthorized: false
        }),
        auth: {
            username: properties.apiUserName,
            password: properties.apiPassword
        }
    })
}

