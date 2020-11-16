import { NextFunction, Request, Response, Router } from 'express';

import { TaskCalendar } from "../models/TaskCalendar"

export const TaskCalendarController: Router = Router();

TaskCalendarController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let TaskCalendar = req.body;
  try {
    const TaskCalendarModel = await new TaskCalendar(TaskCalendar).save()
    res.send({ id: TaskCalendarModel._id });
  } catch (err) {
    next(err)
  }
});

TaskCalendarController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await TaskCalendar.find({})
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})
