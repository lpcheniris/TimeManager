import mongoose from "mongoose"

import setupMongo from "../config/mongo";
import { Plan } from "../models/Plan"
import { Timer } from "../models/Timer"
import { Schedule } from "../models/Schedule"

setupMongo() 

async function addPlans() {
  try {
    await Timer.remove({})
    await Schedule.remove({})
    console.log("Remove Timer and Shedules Seccefully!")
  } catch(e) {
    console.error(e)
  } finally {
    mongoose.disconnect();
  }
}

addPlans()