import mongoose from "mongoose"

import setupMongo from "../config/mongo";
import { Schedule } from "../models/Schedule"
import { Timer } from "../models/Timer"

setupMongo()

async function addShedule() {
    const dataTemplate = { "duration": 600, "startTime": "1619020800000", "timePeriod": { "seconds": 604800, "text": "Week" }, "plan": "60376e2e1e5ff84687e9dff3", "importance": 5, "emergency": 5 }
    const dataCount = 10
    for(let i = 0; i< dataCount ;i++) {
        let randomData = Number.parseFloat(Math.random().toFixed(5))*100000
        let data = Object.assign({schedule: randomData}, dataTemplate)
        new Schedule(data).save()
    }
}

async function addTimer() {
    let timerTemplate = {"startTime":"1618976430000","endTime":"1618990830000","durationTime":14400,"plan":"60376e2e1e5ff84687e9dff3"}
    const scheduleList = await Schedule.find({}, "schedule").exec()
   
    scheduleList.forEach(element => {

        let randomData = Number.parseFloat(Math.random().toFixed(5))*100000
        let data = Object.assign({comment: randomData, schedule:element.id }, timerTemplate)
        console.log(data)
        new Timer(data).save()
    });
}
// addShedule()
// addTimer()