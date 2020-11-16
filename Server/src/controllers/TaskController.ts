import { NextFunction, Request, Response, Router } from 'express';

import { Task } from "../models/Task"

export const TaskController: Router = Router();

TaskController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let task = req.body;
  try {
    const taskModel = await new Task(task).save()
    res.send({ id: taskModel._id });
  } catch (err) {
    next(err)
  }
});

TaskController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Task.find({})
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})
