import { NextFunction, Request, Response, Router } from 'express';

import { Timer } from "../models/Timer"

export const TimerController: Router = Router();

TimerController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    let timer = req.body;
    try {
        const timerModel = await new Timer(timer).save()
        res.send({ id: timerModel._id });
    } catch (err) {
        next(err)
    }
});

TimerController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Timer.find({}).populate({path: "plane"}).exec()
      res.send({ data: data })
    } catch (err) {
      next(err)
    }
})

TimerController.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Timer.remove({ _id: req.params.id })
        res.send({ message: "deleted" })
      } catch (err) {
        next(err)
      }
})
