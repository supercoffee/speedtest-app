import {TestType} from "./iperf-lib";

export interface RunTestRequest {
    clientIp: string;
    testType: TestType;

    /**
     * Server sends to client in reverse mode
     * Default: false
     */
    reverse: boolean;
}
