import mongoose from "mongoose";
import { Plane } from "./Plane";
const ScheduleSchema = new mongoose.Schema({
  duration: { type: Number, min: 0, required: true },
  timePeriod: Object,
  plane: { type: mongoose.Schema.Types.ObjectId, ref: Plane,required: true },
  schedule: { type: String, required: true, unique:true, minlength:2 , maxlength: 50}
})

ScheduleSchema.virtual('restTime', {
  ref: 'Timer', // The model to use
  localField: 'schedule', // Find people where `localField`
  foreignField: 'schedule', // is equal to `foreignField`
  justOne: false,
  options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

ScheduleSchema.set('toObject', { virtuals: true });
ScheduleSchema.set('toJSON', { virtuals: true });

export const Schedule = mongoose.model("Schedule", ScheduleSchema)
