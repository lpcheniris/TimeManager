import { NextFunction, Request, Response, Router } from 'express';

import { Diary } from "../models/Diary"

export const DiaryController: Router = Router();

DiaryController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let diaryData = req.body;
  try {
    let result = null
    let isExist = await Diary.exists({date: diaryData.date})
    if (isExist) {
      result = await Diary.findOneAndUpdate({date: diaryData.date}, {diary: diaryData.diary});
    } else {
      result = await new Diary(diaryData).save()
    }
    res.send( {result});
  } catch (err) {
    next(err)
  }
});

DiaryController.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Diary.remove({ _id: req.params.id })
        res.send({ message: "deleted" })
      } catch (err) {
        next(err)
      }
})

DiaryController.get("/byDate/:date", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Diary.findOne({date: req.params.date}).exec()
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})
