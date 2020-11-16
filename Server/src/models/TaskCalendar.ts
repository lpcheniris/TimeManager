import mongoose from "mongoose"

const TaskCalendarSchema = new mongoose.Schema({
  tasks: { type: [mongoose.Schema.Types.ObjectId], required: true },
  date: { type: mongoose.Schema.Types.Date, required: true, unique: true},
})

export const TaskCalendar = mongoose.model("TaskCalendar", TaskCalendarSchema)
