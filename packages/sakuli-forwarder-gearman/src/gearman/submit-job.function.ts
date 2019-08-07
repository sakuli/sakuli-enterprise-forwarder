import { GearmanClient } from "gearman";
import { inspect } from "util";

class GearmanJobError extends Error {
    constructor(type: string, ...args: any[]) {
        super(`${type}:\n${inspect(args, true, null, true)}`);
    }
}

export async function submitJob(connection: GearmanClient, checkQueue: string, payload: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const finish = (fn:(d: any) => void) => {
            connection.close();
            return (d: any) => fn(d);
        };
        const res = finish(resolve);
        const rej = finish(reject);

        [
            "WORK_FAIL",
            "WORK_EXCEPTION",
            "timeout"
        ].forEach(evt => connection.on(evt, (...args: any[]) => rej(new GearmanJobError(evt, ...args))));

        connection.on("WORK_COMPLETE", res);
        connection.on('JOB_CREATED', id => console.log('Created JOB: ' + id));

        // connect to the gearman server
        connection.connect(function () {
            connection.setOption();
            connection.submitJob(checkQueue, payload, {
                encoding: 'utf8'
            });
        })
    })
}