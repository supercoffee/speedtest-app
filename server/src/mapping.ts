import {Iperf3} from "./iperf-models";
import {ISpeedTest, SpeedTestModel, TestResults} from "./models";
import TestResult = Iperf3.TestResult;
import moment = require("moment");
import {TestType} from "./iperf-lib";
import TcpEnd = Iperf3.TcpEnd;
import UdpEnd = Iperf3.UdpEnd;

export function transformOutputToModel(output: TestResult): ISpeedTest {


    function transformTcp(end: Iperf3.TcpEnd): TestResults {
        return {
            start: end.sum_sent.start,
            end: end.sum_sent.end,
            seconds: end.sum_sent.seconds,
            bitsPerSecond: end.sum_sent.bits_per_second,
            bytes: end.sum_sent.bytes,
            lostPackets: 0,
            jitterMs: 0,
            packets: 0
        }
    }

    function transformUdp(end: Iperf3.UdpEnd): TestResults {
        return {
            start: end.sum.start,
            end: end.sum.end,
            seconds: end.sum.seconds,
            bytes: end.sum.bytes,
            bitsPerSecond: end.sum.bits_per_second,
            lostPackets: end.sum.lost_packets,
            jitterMs: end.sum.jitter_ms,
            packets: end.sum.packets
        }
    }

    return new SpeedTestModel({
        timestamp: moment(output.start.timestamp.time).toDate(),
        direction: output.start.test_start.reverse ? 'up' : 'down',
        protocol: output.start.test_start.protocol as 'TCP' | 'UDP',
        streamCount: output.start.test_start.num_streams,
        results: (function(): TestResults {
            const isTCP = output.start.test_start.protocol === TestType.tcp;
            return isTCP ? transformTcp(output.end as TcpEnd) : transformUdp(output.end as UdpEnd);
        })()

    });

}
