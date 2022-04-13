import { NextFunction, Request, Response, Router } from 'express';

import { Diary } from "../models/Diary"

export const DiaryController: Router = Router();

DiaryController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let diaryData = req.body;
  let date = {date: diaryData.date}
  try {
    let result = null
    let isExist = await Diary.exists(date)
    if (isExist) {
      result = await Diary.findOneAndUpdate({date: date}, {diary: diaryData.tasks}, {
      new: true
    });
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
  let date = req.params
  try {
    const data = await Diary.find({date: date}).exec()
    res.send({ data: data })
  } catch (err) {
    next(err)
  }
})
