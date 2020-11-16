import mongoose from "mongoose"
import { Task } from "./Task"

const TaskCalendarSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: Task,required: true },
  date: { type: mongoose.Schema.Types.Date, required: true},
  isDone: {type: mongoose.Schema.Types.Boolean, required: true}
})

export const TaskCalendar = mongoose.model("TaskCalendar", TaskCalendarSchema)
