import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

// tsconfig.json中禁止了未使用的参数"noUnusedParameters": true,
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const h = Number(req.query.height)
  const w = Number(req.query.weight)
  res.send({
    weight: w,
    height: h,
    bmi: calculateBmi(h, w)
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});