declare module "gearman" {

    export interface GearmanOptions {
        timeout?: number
    }

    export type JobPriority = 'normal'

    export interface SubmitJobOptions {
        unique_id?: string,
        background?: boolean,
        priority?: JobPriority,
        encoding?: string | null,
    }

    export interface AdminStatus {
        total: number,
        running: number,
        available_workers: number
    }

    export interface WorkerResult {
        fd: number,
        ip: string,
        id: string
    }

    export type GearmanPayload = string;
    export type GearmanData = string | Buffer;

    export class GearmanClient {
        on(e: 'timeout', cb: () => void): void;
        on(e: 'WORK_COMPLETE', cb: (job: any) => void): void;
        on(e: 'JOB_CREATED', cb: (jobId: string) => void): void;
        on(e: string, cb: Function): void;

        connect(cb: () => void): void;
        removeEventListener(event: string, fn: any): void;
        getJobStatusUnique(uid: string): void;
        echo(payload: GearmanData): void;
        getJobstatus(uniqueId: string): void;
        setOption(optionName?: string): void
        submitJob(func_name: string, data?: GearmanData | null, options?: any): void;
        addFunction(func_name: string, timeout?: number): void;
        removeFunction(func_name: string): void;
        resetAbilities(): void;
        preSleep(): void;
        grabJob(): void;
        grabUniqueJob(): void;
        sendWorkStatus(job_handle: string, percent_numerator: string, percent_denominator: string): void;
        sendWorlFail(job_handle: string): void;
        sendWorkComplete(job_handle: string, data: Buffer): void;
        sendWorkData(job_handle: string, data: Buffer): void;
        sendWorkException(job_handle: string, exception: any): void;
        sendWorkWarning(job_handle: string, warning: any): void;
        setWorkerId(id: string): void;
        adminStatus(cb: (status: AdminStatus) => void): void;
        adminWorkers(cb: (info: WorkerResult[]) => void): void;
        adminDropFunction(name: string, cb: (res: Error | null) => void): void;
        close(): void;

    }

    function gearman(host?: string, port?: number, options?: GearmanOptions): GearmanClient

    export default gearman;
}