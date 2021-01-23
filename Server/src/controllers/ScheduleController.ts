import { NextFunction, Request, Response, Router } from 'express';

import { Schedule } from "../models/Schedule"

export const ScheduleController: Router = Router();

ScheduleController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let schedule = req.body;
  try {
    const ScheduleModel = await new Schedule(schedule).save()
    res.send({ id: ScheduleModel._id });
  } catch (err) {
    next(err)
  }
});

ScheduleController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = await Schedule.find({}).lean().populate("plane").populate('restTime', "durationTime").exec()
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})

ScheduleController.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Schedule.remove({ _id: req.params.id })
    res.send({ message: "deleted" })
  } catch (err) {
    next(err)
  }
})

ScheduleController.get('/byPlaneId/:planeId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = await Schedule.find({ "plane": { "_id": req.params.planeId } }, "schedule").exec()
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
    let data = await Schedule.findOne({ _id: req.params.id }).populate({path: "plane"})
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})


