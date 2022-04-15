import mongoose from "mongoose"

import { plan } from "./plan.json"
import setupMongo from "../../config/mongo";
import { Plan } from "../../models/Plan"

setupMongo() 

async function fixPlans() {
  try {
    plan.forEach((v) => {
        console.log(v.duration)
      Plan.findOneAndUpdate({name: v.name}, {$set:{
        duration: v.duration,
        durationUnit: v.durationUnit
      }})
    })
  } catch(e) {
    console.error(e)
  } finally {
    // mongoose.disconnect();
    console.log("Fix Plan Seccefully!")
  }
}

fixPlans()