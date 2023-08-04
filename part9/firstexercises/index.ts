/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ValidateInput } from "./exerciseCalculator";

import { checkNumber } from "./utils/checkIfNumber";

import express from "express";

const app = express();
app.use(express.json());


app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get(`/bmi`, (req, res) => {

  if(!req.query.height || !req.query.weight) {
    return res.status(400).send({
      error: 'Missing height or weight input'
    });
  }

  try {
    const heightValue: number = checkNumber(req.query.height);
    const weightValue: number = checkNumber(req.query.weight);
    const calculationResult: string = calculateBmi(heightValue, weightValue);

    return res.send({
      weight: weightValue,
      heightValue: heightValue,
      bmi: calculationResult
    });
  }
  catch(err) {
    return res.status(400).send({
      error: 'malformatted params'
    });
  }

});

app.post("/exercises", (req, res) => {

  try {
    const input = req.body as ValidateInput;
    const reqTarget = input.target;
    const reqExercises = input.daily_exercises;

    if(!reqTarget || !reqExercises) {
      return res.status(400).send({
        error: 'parameters missing'
      });
    }
    
    const target: number = checkNumber(reqTarget);
    const exercises: number[] = [];

    reqExercises.forEach((el) => {
      if(typeof el === 'number' && !Number.isNaN(el)) {
        exercises.push(el);
      } else {
        throw new Error('malformatted params');
      }
    });

    const calculationResult = calculateExercises(target, ...exercises);
    return res.send({calculationResult});

  } catch (err) {
    return res.status(400).send({
      error: 'malformatted params'
    });
  }
}
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
