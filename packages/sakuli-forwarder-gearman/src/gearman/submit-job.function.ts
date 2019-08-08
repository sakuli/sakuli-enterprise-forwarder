import {GearmanClient} from "gearman";
import {ifPresent, Maybe, SimpleLogger} from "@sakuli/commons";

export interface GearmanData {
    connection: GearmanClient;
    checkQueue: string;
    payload: string;
}

export async function submitJob(data: GearmanData, logger: Maybe<SimpleLogger>): Promise<any> {
    return new Promise((resolve) => {
        const finish = (fn: () => void) => {
            data.connection.close();
            return () => fn();
        };
        const res = finish(resolve);

        [
            "WORK_FAIL",
            "WORK_EXCEPTION",
            "timeout",
            "error"
        ].forEach(evt => data.connection.on(evt, (...args: any[]) => {
            ifPresent(logger, (log) => {
                log.error(evt, ...args);
            });
            res();
        }));

        data.connection.on("WORK_COMPLETE", res);
        data.connection.on('JOB_CREATED', id => {
            ifPresent(logger, (log) => {
                log.debug('Created JOB: ' + id)
            });
        });

        // connect to the gearman server
        try {
            data.connection.connect(function () {
                data.connection.setOption();
                data.connection.submitJob(data.checkQueue, data.payload, {
                    encoding: 'utf8'
                });
            })
        } catch (err) {
            ifPresent(logger, (log) => {
                log.error('Failed to connect to Gearman server.', err);
            });
        }
    })
}