import { runInsecure } from "./run-insecure.function";

describe('runInsecure', () => {

    it('should set NODE_TLS_REJECT_UNAUTHORIZED to false for this function', () => {
        const defaultValue = process.env['NODE_TLS_REJECT_UNAUTHORIZED'];
        runInsecure(() => {
            expect(process.env['NODE_TLS_REJECT_UNAUTHORIZED']).toBe('0');
        });
        expect(process.env['NODE_TLS_REJECT_UNAUTHORIZED']).toBe(defaultValue);
        expect.assertions(2);
    })


})
