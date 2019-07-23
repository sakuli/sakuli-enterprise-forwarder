import { TestContextEntity } from "@sakuli/core";
import { ProcessCheckResultRequest } from "../access/process-check-result-request.interface";

export const processCheckResultRequestFromContext = (entity: TestContextEntity): ProcessCheckResultRequest => {
    
    return ({
        check_source: '',
        check_command: '',
        exit_status: entity.state,
        plugin_output: '',
        performance_data: []
    })
}
