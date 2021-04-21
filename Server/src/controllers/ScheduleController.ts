import { NextFunction, Request, Response, Router } from 'express';
import { check, validationResult } from "express-validator" 

import { Schedule } from "../models/Schedule"
import { Timer } from "../models/Timer"

export const ScheduleController: Router = Router();

ScheduleController.post('/', 
check("schedule").custom((value) => {
  return Schedule.findOne({schedule: value}).then(schedule => {
    if (schedule) {
      return Promise.reject('Schedule already in use');
    }
  });
}),
async (req: Request, res: Response, next: NextFunction) => {
  let schedule = req.body;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
  try {
    const ScheduleModel = await new Schedule(schedule).save()
    res.send({ id: ScheduleModel._id });
  } catch (err) {
    next(err)
  }
});

ScheduleController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  let params = req.query
  try {
    let data = await Schedule.find(params).sort({startTime: 1,  emergency: -1, importance: -1}).lean().populate("plan").populate('restTime', "durationTime").exec()
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})

ScheduleController.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Schedule.remove({ _id: req.params.id })
    await Timer.deleteMany({schedule: req.params.id})
    res.send({ message: "deleted" })
  } catch (err) {
    next(err)
  }
})

ScheduleController.get('/byPlanId/:planId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = await Schedule.find({ "plan": { "_id": req.params.planId } }, "schedule").sort({isDone: 1}).exec()
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})

ScheduleController.put('/:scheduleID', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = await Schedule.findOneAndUpdate({_id: req.params.scheduleID}, {isDone: true})
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})

ScheduleController.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = await Schedule.findOne({ _id: req.params.id }).populate({path: "plan"})
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})


