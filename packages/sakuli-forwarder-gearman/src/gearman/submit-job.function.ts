import {GearmanClient} from "gearman";
import {ifPresent, Maybe, SimpleLogger} from "@sakuli/commons";

export interface GearmanData {
    connection: GearmanClient;
    checkQueue: string;
    payload: string;
}

export async function submitJob(data: GearmanData, logger: Maybe<SimpleLogger>): Promise<any> {
    return new Promise((resolve, reject) => {
        const finish = (fn: () => void) => {
            data.connection.close();
            fn();
        };

        [
            "WORK_FAIL",
            "WORK_EXCEPTION",
            "timeout",
            "error"
        ].forEach(evt => data.connection.on(evt, (args: any) => {
            ifPresent(logger, (log) => {
                log.error(`Received Gearman event ${evt} with following data:`, args);
            });
            finish(reject);
        }));

        data.connection.on("WORK_COMPLETE", () => {
            ifPresent(logger, (log) => {
                log.debug(`Received Gearman event: 'WORK_COMPLETE'... Closing connection!`);
            });
            finish(resolve);
        });
        data.connection.on('JOB_CREATED', id => {
            ifPresent(logger, (log) => {
                log.debug('Created JOB: ' + id)
            });
        });

        // connect to the gearman server
        try {
            data.connection.connect(() => {
                ifPresent(logger, (log) => {
                    log.debug('Connected to gearman host...');
                });
                data.connection.setOption();
                ifPresent(logger, (log) => {
                    log.trace(`Submitting job to queue '${data.checkQueue}'`);
                });
                data.connection.submitJob(data.checkQueue, data.payload, {
                    encoding: 'utf8'
                });
                ifPresent(logger, (log) => {
                    log.trace('Job submitted...');
                });
            })
        } catch (err) {
            const errorMessage = 'Failed to connect to Gearman server.'
            ifPresent(logger, (log) => {
                log.error(errorMessage, err);
            });
            reject(errorMessage);
        }
    })
}
