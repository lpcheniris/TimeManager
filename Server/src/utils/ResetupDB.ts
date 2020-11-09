import mongoose from "mongoose"

import setupMongo from "../config/mongo";
import { Plane } from "../models/Plane"
import { Timer } from "../models/Timer"
import { Schedule } from "../models/Schedule"

setupMongo() 

async function addPlanes() {
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

addPlanes()