export const runInsecure = <T extends (...args: any[])=> any>(insecureFn: T): ReturnType<T> => {
    const defaultNodeTlsRejectUnauthorized = process.env["NODE_TLS_REJECT_UNAUTHORIZED"];
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    const ret = insecureFn();
    if(defaultNodeTlsRejectUnauthorized === undefined) {
        delete process.env["NODE_TLS_REJECT_UNAUTHORIZED"];
    } else {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = defaultNodeTlsRejectUnauthorized;
    }
    return ret;
}
