import express from 'express';
import diariesService from '../services/diariesService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diariesService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diariesService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  // eslint规则@typescript-eslint/no-unsafe-assignment阻止我们将请求体的字段分配给变量。
  // /workspaces/fullstackopen/part9/demo-flight-diaries/src/routes/diaries.ts
  // 21:9  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  // 23:5  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  // 24:5  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  // 25:5  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  // 26:5  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  // 忽略整个文件中的eslint规则，在文件的第一行加入以下内容。
  // /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  // const { date, weather, visibility, comment } = req.body;
  // const newDiaryEntry = diariesService.addDiary({
  //   date,
  //   weather,
  //   visibility,
  //   comment
  // });
  // res.json(newDiaryEntry);

  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diariesService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;