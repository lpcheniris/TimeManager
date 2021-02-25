import mongoose from "mongoose";
import { Plan } from "./Plan";
import { Schedule } from "./Schedule";
const TimerSchema = new mongoose.Schema({
  durationTime: { type: Number, min: 0, required: true },
  endTime: { type: Date, required: true },
  startTime: { type: Date, required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: Plan, required: true },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: Schedule, required: true},
  comment: { type: String }
})

export const Timer = mongoose.model("Timer", TimerSchema)
