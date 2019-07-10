import axiosMock from 'axios';
import { createAxiosClientFromProperties } from "./create-axios-client-from-properties.function";
import { Icinga2Properties } from "../icinga2-properties.class";

const {objectContaining} = expect;

describe('createAxiosClient', () => {

    let properties: Icinga2Properties;
    beforeEach(() => {
        jest.spyOn(axiosMock, 'create');
        properties = new Icinga2Properties();
        properties.apiHost = 'https://localhost';
        properties.apiUserName = 'user';
        properties.apiPassword = 'pw';
        properties.apiPort = 5665;
        properties.apiHostName = 'sakulihost';
    })

    it('should create an AxiosInstance', async () => {
        const client = await createAxiosClientFromProperties(properties);
        expect(axiosMock.create).toHaveBeenCalledWith(objectContaining({
            baseURL: 'https://localhost:5665/v1',
            auth: {
                username: 'user',
                password: 'pw'
            },
        }));
        expect(client).toBeDefined();
    })

    it('should fail with an invalid properties object', async() => {
        await expect(async () => {
            await createAxiosClientFromProperties(new Icinga2Properties);
        }).rejects;
    })

})
