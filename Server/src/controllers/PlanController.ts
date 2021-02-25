import { NextFunction, Request, Response, Router } from 'express';

import { Plan } from "../models/Plan"

export const PlanController: Router = Router();

PlanController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plan = await new Plan(req.body).save()
    res.send({ data: plan._id })
  } catch (err) {
    next(err)
  }
})

PlanController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Plan.find({})
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})

PlanController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Plan.remove({ _id: req.params.id })
    res.send({ message: "deleted" })
  } catch (err) {
    next(err)
  }
})

PlanController.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Plan.findByIdAndUpdate(req.params.id, req.body, () => {
      res.send({ message: "success" })
    })
  } catch (err) {
    next(err)
  }
})

