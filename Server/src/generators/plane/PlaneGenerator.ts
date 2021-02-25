import mongoose from "mongoose"

import { plan } from "./plan.json"
import setupMongo from "../../config/mongo";
import { Plan } from "../../models/Plan"

setupMongo() 

async function addPlans() {
  try {
    await Plan.remove({})
    plan.forEach((v) => {
      new Plan(v).save()
    })
    
  } catch(e) {
    console.error(e)
  } finally {
    // mongoose.disconnect();
    console.log("Generate Plan Seccefully!")
  }
}

addPlans()