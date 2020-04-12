import {Document, Schema} from "mongoose";
import * as mongoose from "mongoose";

const SpeedTest: Schema = new Schema({

});

export interface ISpeedTest extends Document {

}

export const SpeedTestModel = mongoose.model<ISpeedTest>('SpeedTest', SpeedTest);
