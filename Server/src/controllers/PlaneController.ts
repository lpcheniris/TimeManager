import { NextFunction, Request, Response, Router } from 'express';

import { Plane } from "../models/Plane"

export const PlaneController: Router = Router();

PlaneController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plane = await new Plane(req.body).save()
    res.send({ data: plane._id })
  } catch (err) {
    next(err)
  }
})

PlaneController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Plane.find({})
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})

PlaneController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Plane.remove({ _id: req.params.id })
    res.send({ message: "deleted" })
  } catch (err) {
    next(err)
  }
})

PlaneController.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Plane.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
      res.send({ message: "success" })
    })
  } catch (err) {
    next(err)
  }
})

