import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema({
  date: { type: mongoose.Schema.Types.Date, required: true, unique: true},
  diary: {type: String, required:true }
})

export const Diary = mongoose.model("Diary", DiarySchema)