import {Iperf3} from "./iperf-models";
import TestResult = Iperf3.TestResult;
import { exec } from "child_process";


export enum TestType {
    tcp = 'tcp',
    udp = 'udp'
}

export function iperf3(client: string,
                       type: TestType = TestType.tcp,
                       reverse: boolean = false): Promise<TestResult> {

    let args = ['iperf3 -J'];
    if (type === TestType.udp) {
        args.push('-u');
    }
    if (client) {
        args.push(`-c ${client}`);
    } else {
        return Promise.reject('client not specified');
    }
    if (reverse) {
        args.push('-R')
    }

    const command = args.join(' ');
    return new Promise<TestResult>((resolve, reject) => {
        exec(command, (error: any, stdout: string, sterr) => {
            if (error) {
                reject(error);
                return;
            }
            if (sterr) {
                reject(sterr);
                return;
            }
            const result: TestResult = JSON.parse(stdout);
            resolve(result)
        });
    });
}
