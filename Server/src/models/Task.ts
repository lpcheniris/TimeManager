import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
  task: {type: String, required: true, minlength: 2, maxlength: 50}, 
})

export const Task = mongoose.model("Task", TaskSchema)
