import express from "express";

import patientsService from "../services/patientsService";

import toNewPatientEntry from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getPublicPatients();
  res.send(patients);
});

router.post("/", (req, res) => {
  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  // const addedPatient = patientsService.addPatient({
  //   name,
  //   dateOfBirth,
  //   ssn,
  //   gender,
  //   occupation
  // });

  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatient);

    console.log(addedPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errMsg = 'Something went wrong:';
    if (error instanceof Error) {
      errMsg += ' Error: ' + error.message;
    }
    res.status(400).send(errMsg);
  }
});

export default router;
