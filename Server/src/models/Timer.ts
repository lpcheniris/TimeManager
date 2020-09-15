import mongoose from "mongoose";
const TimerSchema = new mongoose.Schema({
  durationTime: { type: Number, min: 0, required: true },
  endTime: { type: Date, required: true },
  startTime: { type: Date, required: true },
  plane: { type: String, required: true },
  event: { type: String, required: true, minlength:2 , maxlength: 15}
})

export const Timer = mongoose.model("Timer", TimerSchema)
