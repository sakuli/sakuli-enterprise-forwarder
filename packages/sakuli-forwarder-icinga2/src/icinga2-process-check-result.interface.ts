export interface ProcessCheckResultRequest {

    type: "Host" | "Service",

    filter?:string;

    /**
     * Required. For services: 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN, for hosts: 0=OK, 1=CRITICAL.
     */
    exit_status: number;

    /**
     * Required. One or more lines of the plugin main output. Does not contain the performance data.
     */
    plugin_output: string;

    performance_data: string[];

    /**
     * Optional. The first entry should be the check commands path, then one entry for each command line option followed by an entry for each of its argument.
     */
    check_command?:string;

    /**
     * Optional. Usually the name of the command_endpoint
     */
    check_source?:string

    /**
     * Optional. The timestamp where a script/process started its execution.
     */
    execution_start?: string;

    /**
     * Optional. The timestamp where a script/process ended its execution. This timestamp is used in features to determine e.g. the metric timestamp.
     */
    execution_end?: string;

    /**
     * Optional. Time-to-live duration in seconds for this check result. The next expected check result is now + ttl where freshness checks are executed.
     */
    ttl?:number
}
