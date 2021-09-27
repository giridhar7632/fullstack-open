import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello! head over to <code>/hello</code>');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (
    req.query &&
    Object.keys(req.query).includes('weight') &&
    Object.keys(req.query).includes('height')
  ){

  const { height, weight } = req.query
    res.json({ height, weight, bmi: calculateBmi(Number(height), Number(weight)) });
  }
  else {
    res.status(400).json({
      error: 'malformatted parameters'
    });
  }
});

app.post('/exercise', (req, res) => {
  if (
    req.body &&
    Object.keys(req.body).includes('daily_exercises') &&
    Object.keys(req.body).includes('target')
  ){

  const { daily_exercises, target } = req.body;

  res.json(exerciseCalculator(daily_exercises, target))
  } else {
    res.status(400).json({
      error: 'parameters missing'
    });
  }
  
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
