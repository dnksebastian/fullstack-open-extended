import { calculateBmi } from "./bmiCalculator";

import express from "express";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get(`/bmi`, (req, res) => {
  let heightInput;
  let weightInput;

  if (req.query.height && req.query.weight) {
    heightInput = +req.query.height;
    weightInput = +req.query.weight;
  }

  if (heightInput && weightInput) {
    try {
      const calculationResult = calculateBmi(heightInput, weightInput);
      return res.send({
        weight: weightInput,
        height: heightInput,
        bmi: calculationResult,
      });
    } catch (err) {
      return res.status(400).send({ error: "malformatted parameters" });
    }
  } else {
    return res.status(400).send({error: "malformatted parameters"});
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
