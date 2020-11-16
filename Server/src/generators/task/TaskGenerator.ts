import mongoose from "mongoose"

import { task } from "./task.json"
import setupMongo from "../../config/mongo";
import { Task } from "../../models/Task"

setupMongo() 

async function addTasks() {
  try {
    await Task.remove({})
    task.forEach((v) => {
      new Task(v).save()
    })
    
  } catch(e) {
    console.error(e)
  } finally {
    // mongoose.disconnect();
    console.log("Generate Task Seccefully!")
  }
}

addTasks()