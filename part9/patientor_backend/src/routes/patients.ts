/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";

import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getPublicPatients();
  res.send(patients);
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  
  const addedPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  try {
    console.log(addedPatient);
    res.json(addedPatient);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default router;
