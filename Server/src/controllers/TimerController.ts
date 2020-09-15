import { NextFunction, Request, Response, Router } from 'express';

import { Timer } from "../models/Timer"

export const TimerController: Router = Router();

TimerController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    let timer = req.body;
    try {
        const timerModel = await new Timer(timer).save()
        res.send({ id: timerModel._id });
    } catch (e) {
        next(e);
    }
});

