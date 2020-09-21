import { NextFunction, Request, Response, Router } from 'express';

import { Timer } from "../models/Timer"
import { Schedule } from "../models/Schedule"

export const PublicController: Router = Router();


PublicController.delete('/timer', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plane = await Timer.deleteMany({})
    res.send({ data: "ok" })
  } catch (err) {
    next(err)
  }
})
PublicController.delete('/schedule', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plane = await Schedule.deleteMany({})
    res.send({ data: "ok" })
  } catch (err) {
    next(err)
  }
})

