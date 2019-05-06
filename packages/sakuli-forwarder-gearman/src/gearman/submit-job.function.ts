import { GearmanClient } from "gearman";
import { inspect } from "util";

class GearmanJobError extends Error {
    constructor(type: string, ...args: any[]) {        
        super(`${type}:\n${inspect(args, true, null, true)}`);
    }
}

export async function submitJob(connection: GearmanClient, payload: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const finish = (fn:(d: any) => void) => {
            connection.close();
            return (d: any) => fn(d);
        }
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
            // submit a job to uppercase a string with normal priority in the foreground
            console.log('connected')
            const d = new Date();
            connection.setOption();
            connection.submitJob('check_results', payload, {
                encoding: 'utf8'
            })

        })

    })
}