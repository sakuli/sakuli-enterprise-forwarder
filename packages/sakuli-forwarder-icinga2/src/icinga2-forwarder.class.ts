import { Forwarder, TestExecutionContext, Project, TestSuiteContext, FinishedMeasurable, TestStepContext } from "../node_modules/@sakuli/core/dist";
import axios from '../node_modules/axios'
import {Agent} from 'https';
import { ProcessCheckResultRequest } from "./icinga2-process-check-result.interface";

export class Icinga2Forwarder implements Forwarder {

    async forwardStepResult(entity: TestStepContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {

    }

    async forward(ctx: TestExecutionContext, project: Project): Promise<any> {
        //https://my-icinga-host:5665/v1/actions/process-check-result

        const http = axios.create({
            baseURL: 'https://localhost:5665/v1',
            headers: { 'Accept': 'application/json' },
            httpsAgent: new Agent({
                rejectUnauthorized: false
            }),
            auth: {
                username: 'root',
                password: '083db1c1bd9c4688'
            }
        });

        const requestData: ProcessCheckResultRequest = {
            type: 'Host',
            filter: 'host.name="sakuliclient01"',
            check_source: 'check_sakuli',
            check_command: 'check_sakuli',
            exit_status: 0,
            plugin_output: "Sakuli suite 'example_ubuntu_0' (ID: 0000) ran in 49.31 seconds.",
            performance_data: []
        }

        const defaultNodeTlsRejectUnauthorized = process.env["NODE_TLS_REJECT_UNAUTHORIZED"];
        try {
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
            const resp = await http.post('actions/process-check-result?host=sakuliclient01', requestData);
            console.log(resp);

        } catch(e) {
            console.warn(e);
        } finally {
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = defaultNodeTlsRejectUnauthorized;
        }
    }

}
