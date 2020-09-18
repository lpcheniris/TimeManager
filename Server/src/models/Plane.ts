import mongoose from "mongoose"

const PlaneSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 2, maxlength: 20}, 
  color: {type: String, enum: ["#AC92EB", "#4FC1E8", "#A0D568", "#FFCE54", "#ED5564"]},
})

// "#AC92EB",  紫色  Professional Skills
// "4FC1E8",  蓝色  Soft Skills
// "#A0D568", 绿色  Health
//  "#FFCE54", 黄色  Enjoy
//  "#ED5564" 红色  Working

export const Plane = mongoose.model("Plane", PlaneSchema)
