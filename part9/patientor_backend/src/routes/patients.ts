import express from 'express';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getPublicPatients();
  res.send(patients);
});

export default router;