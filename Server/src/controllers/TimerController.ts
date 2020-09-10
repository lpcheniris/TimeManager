import { NextFunction, Request, Response, Router } from 'express';
export const TimerController: Router = Router();

TimerController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    try {
        res.send({ data: "success" });
    } catch (e) {
        next(e);
    }
});

