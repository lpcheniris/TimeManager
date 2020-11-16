import { NextFunction, Request, Response, Router } from 'express';

import { TaskCalendar } from "../models/TaskCalendar"

export const TaskCalendarController: Router = Router();

TaskCalendarController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let taskCalendar = req.body;
  let date = {date: taskCalendar.date}
  try {
    let result = null
    let isExist = await TaskCalendar.exists(date)
    if (isExist) {
      result = await TaskCalendar.findOneAndUpdate({date: taskCalendar.date}, {tasks: taskCalendar.tasks}, {
      new: true
    });
    } else {
      result = await new TaskCalendar(taskCalendar).save()
    }
    res.send( {result});
  } catch (err) {
    next(err)
  }
});

TaskCalendarController.get('/byDate/:date', async (req: Request, res: Response, next: NextFunction) => {
  let date = req.body;
  try {
    const data = await TaskCalendar.findOne({date: req.params.date})
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})

TaskCalendarController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await TaskCalendar.find({})
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})
