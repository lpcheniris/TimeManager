import mongoose from "mongoose"

const PlaneSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 2, maxlength: 20}, 
  color: {type: String, enum: ["#AC92EB", "#4FC1E8", "#A0D568", "#FFCE54", "#ED5564"]},
  duration: {type: Number, required: true, default: 1},
  durationUnit: {type: String, required: true, default: "h"}
})

export const Plane = mongoose.model("Plane", PlaneSchema)
