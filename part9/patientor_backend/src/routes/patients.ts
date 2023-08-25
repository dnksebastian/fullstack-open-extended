import express from "express";

import patientsService from "../services/patientsService";

import toNewPatientEntry from "../utils/patients_utils";
import { toNewEntry } from "../utils/entries_utils";

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
  const patient = patientsService.getSinglePatient(id);
  
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

router.post("/:id/entries", (req, res) => {
  const patient = patientsService.getSinglePatient(req.params.id);

  if (!patient) {
    res.status(404).send({ error: 'Could not find patient with entered ID' });
  }

  try { 
    const typedEntry = toNewEntry(req.body);

    if (patient) {
      const patientUpdated = patientsService.addEntry(patient, typedEntry);
      res.send(patientUpdated);
    } else {
      throw new Error('Failed to add entry for chosen patient');
    }
  }
  catch(err: unknown) {
    let message = 'Something went wrong: ';

    if(err instanceof Error) {
      message += ' Error: ' + err.message;
    }
    res.status(400).send(message);
  }

});

export default router;
