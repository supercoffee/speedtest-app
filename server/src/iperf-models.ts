
export namespace Iperf3 {


    export interface TestResult {
        start: Start;
        intervals: Interval[];
        end: TcpEnd | UdpEnd;
    }
    
    interface Start {
        timestamp: TimeStampBlock;
        test_start: TestStart;
    }

    interface TimeStampBlock {
        time: string;
        timesecs: number;
    }

    interface TestStart {
        protocol: string;
        num_streams: number;
        blksize: number;
        duration: number;
        bytes: number;
        blocks: number;
        reverse: number;

    }

    interface Interval {
        streams: StreamStats[];
        sum: BaseStats;
    }

    interface StreamStats extends BaseStats{
        snd_cwnd: number;
        rtt: number;
        rttvar: number
        pmtu: number;
    }

    interface BaseStats {
        start: number;
        end: number;
        seconds: number;
        bytes: number;
        bits_per_second: number;
        retransmits: number;
        omitted: boolean;
        sender: boolean;
    }

    interface TcpEnd {
        streams: EndStreamSummary[];
        sum_sent: any;
        sum_received: any;
    }

    interface EndStreamSummary {
        sender: EndStreamSummarySender;
        receiver: BaseStats;
    }

    interface EndStreamSummarySender extends BaseStats{
        max_snd_cwnd: number;
        max_rtt: number;
        min_rtt: number;
        mean_rtt: number;
    }

    interface UdpEnd {
        streams: UdpSummary[];
        sum: UdpSummary;
    }

    interface UdpSummary extends BaseStats{
        jitter_ms: number;
        lost_packets: number;
        packets: number;
        lost_percent: number;
        out_of_order: number;
    }
}
