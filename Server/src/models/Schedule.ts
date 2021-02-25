import mongoose from "mongoose";
import { Plan } from "./Plan";
const ScheduleSchema = new mongoose.Schema({
  duration: { type: Number, min: 0, required: true },
  timePeriod: Object,
  plan: { type: mongoose.Schema.Types.ObjectId, ref: Plan, required: true },
  schedule: { type: String, required: true, unique: true, minlength: 2, maxlength: 50 },
  startTime: { type: Number, min: 0, required: true, default: new Date().getTime() },
  isDone: { type: Boolean, default: false }
})

ScheduleSchema.virtual('restTime', {
  ref: 'Timer', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'schedule', // is equal to `foreignField`
  justOne: false,
  options: { sort: { name: -1 } } // Query options, see http://bit.ly/mongoose-query-options
});

ScheduleSchema.set('toObject', { virtuals: true });
ScheduleSchema.set('toJSON', { virtuals: true });

export const Schedule = mongoose.model("Schedule", ScheduleSchema)
