import mongoose from "mongoose"

import setupMongo from "../config/mongo";
// import { Plan } from "../models/Plan"
import { Timer } from "../models/Timer"
import { Schedule } from "../models/Schedule"
// import { Task } from "../models/Task";
import { TaskCalendar } from "../models/TaskCalendar";

setupMongo() 

async function addPlans() {
  try {
    await Timer.remove({})
    await Schedule.remove({})
    // await Plan.remove({})
    // await Task.remove({})
    await TaskCalendar.remove({})
    console.log("Remove Timer and Shedules Seccefully!")
  } catch(e) {
    console.error(e)
  } finally {
    mongoose.disconnect();
  }
}

addPlans()