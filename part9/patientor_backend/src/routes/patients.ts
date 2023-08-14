import express from "express";

import patientsService from "../services/patientsService";

import toNewPatientEntry from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getPublicPatients();

  if (!patients) {
    res.status(404).send('Could not find patients');
  }
  
  res.send(patients);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getSinglePublicPatient(id);
  
  if (!patient) {
    res.status(404).send('Could not find patient with entered ID');
  }

  res.send(patient);
});

router.post("/", (req, res) => {
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
