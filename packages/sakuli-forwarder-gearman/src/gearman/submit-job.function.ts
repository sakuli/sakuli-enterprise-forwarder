import { GearmanClient } from "gearman";
import { Maybe, SimpleLogger } from "@sakuli/commons";

export interface GearmanData {
    connection: GearmanClient;
    checkQueue: string;
    payload: string;
}

export async function submitJob(data: GearmanData, logger: Maybe<SimpleLogger>): Promise<any> {
    return new Promise((resolve, reject) => {
        const finish = (fn: (value: unknown) => void) => {
            data.connection.close();
            fn(undefined);
        };

        [
            "WORK_FAIL",
            "WORK_EXCEPTION",
            "timeout",
            "error"
        ].forEach(evt => data.connection.on(evt, (args: any) => {
            logger?.error(`Received Gearman event ${evt} with following data:`, args);
            finish(reject);
        }));

        data.connection.on("WORK_COMPLETE", () => {
            logger?.debug(`Received Gearman event: 'WORK_COMPLETE'... Closing connection!`);
            finish(resolve);
        });
        data.connection.on('JOB_CREATED', id => {
        logger?.debug('Created JOB: ' + id)
        });

        // connect to the gearman server
        try {
            data.connection.connect(() => {
                logger?.debug('Connected to gearman host...');
                data.connection.setOption();
                logger?.trace(`Submitting job to queue '${data.checkQueue}'`);
                data.connection.submitJob(data.checkQueue, data.payload, {
                    encoding: 'utf8'
                });
                logger?.trace('Job submitted...');
            })
        } catch (err) {
            const errorMessage = 'Failed to connect to Gearman server.'
            logger?.error(errorMessage, err);
            reject(errorMessage);
        }
    })
}
