import {Document, Schema} from "mongoose";
import * as mongoose from "mongoose";

export interface TestResults  {

    start: number;
    end: number;
    seconds: number;
    bytes: number;
    bitsPerSecond: number;
    // TCP specific
    // todo: coming soon

    // UDP specific
    jitterMs: number;
    lostPackets: number;
    packets: number;
}

export const TestResultSchema: Schema = new Schema({
    start: {
        type: Number,
    },
    end: {
        type: Number,
    },
    seconds: {
        type: Number,
    },
    bytes: {
        type: Number,
    },
    bitsPerSecond: {
        type: Number
    },
    jitterMs: {
        type: Number,
    },
    lostPackets: {
        type: Number,
    },
    packets: {
        type: Number,
    }
});

export interface ISpeedTest extends Document {
    timestamp: Date;
    direction: 'up' | 'down';
    protocol: 'TCP' | 'UDP';
    streamCount: number;

    results: TestResults
}

export const SpeedTestSchema: Schema = new Schema({
    timestamp: {
        type: Date
    },
    direction: {
        type: String,
    },
    protocol: {
        type: String,
    },
    streamCount: {
        type: Number,
    },
    results: {
        type: TestResultSchema
    }
});

export const SpeedTestModel = mongoose.model<ISpeedTest>('SpeedTest', SpeedTestSchema);
