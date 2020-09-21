import mongoose from "mongoose";
import { Plane } from "./Plane";
import { Schedule } from "./Schedule";
const TimerSchema = new mongoose.Schema({
  durationTime: { type: Number, min: 0, required: true },
  endTime: { type: Date, required: true },
  startTime: { type: Date, required: true },
  plane: { type: mongoose.Schema.Types.ObjectId, ref: Plane, required: true },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: Schedule, required: true}
})

export const Timer = mongoose.model("Timer", TimerSchema)
