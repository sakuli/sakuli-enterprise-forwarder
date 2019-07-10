import { createIcinga2ApiAdapter } from "./create-icinga2-api-adapter.function";
import { Icinga2Properties } from "../icinga2-properties.class";
import { createAxiosClientFromProperties } from "./create-axios-client-from-properties.function";


type UnboxedPromise<T> = T extends Promise<(infer U)> ? U : T;

jest.mock('./create-axios-client-from-properties.function', () => ({
    createAxiosClientFromProperties: jest.fn()
}))

describe('createIcinga2ApiAdapter', () => {

    let properties: Icinga2Properties;
    let api: UnboxedPromise<ReturnType<typeof createIcinga2ApiAdapter>>;
    let postMock: jest.Mock;

    beforeEach(async () => {
        postMock = jest.fn();
        (<jest.Mock>createAxiosClientFromProperties).mockResolvedValue({
            post: postMock
        })
        properties = new Icinga2Properties();
        properties.apiHostName = 'mockhost';
        api = await createIcinga2ApiAdapter(properties)
    })
    it('should create an api adapter', async () => {
        expect(createAxiosClientFromProperties).toHaveBeenCalledWith(properties);
    })

    it('should use properties when sending request', async () => {
        const requestBody = {
            performance_data: [],
            exit_status: 0,
            plugin_output: ''
        }
        await api.processCheckResult(requestBody);
        expect(postMock).toHaveBeenCalledWith(`actions/process-check-result?type=host&host=mockhost`, requestBody)
    })

})
