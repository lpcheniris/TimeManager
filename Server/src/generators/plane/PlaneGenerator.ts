import mongoose from "mongoose"

import { plane } from "./plane.json"
import setupMongo from "../../config/mongo";
import { Plane } from "../../models/Plane"

setupMongo() 

async function addPlanes() {
  try {
    await Plane.remove({})
    plane.forEach((v) => {
      new Plane(v).save()
    })
    
  } catch(e) {
    console.error(e)
  } finally {
    // mongoose.disconnect();
    console.log("Generate Plane Seccefully!")
  }
}

addPlanes()