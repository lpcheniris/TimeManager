import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  diary: {type: String, required:true }
})

export const Diary = mongoose.model("Diary", DiarySchema)