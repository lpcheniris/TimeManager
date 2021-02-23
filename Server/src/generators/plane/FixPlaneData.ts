import mongoose from "mongoose"

import { plane } from "./plane.json"
import setupMongo from "../../config/mongo";
import { Plane } from "../../models/Plane"

setupMongo() 

async function fixPlanes() {
  try {
    plane.forEach((v) => {
        console.log(v.duration)
      Plane.findOneAndUpdate({name: v.name}, {$set:{
        duration: v.duration,
        durationUnit: v.durationUnit
      }}, (error, plane)=> {
          console.log(error, plane)
      })
    })
  } catch(e) {
    console.error(e)
  } finally {
    // mongoose.disconnect();
    console.log("Fix Plane Seccefully!")
  }
}

fixPlanes()