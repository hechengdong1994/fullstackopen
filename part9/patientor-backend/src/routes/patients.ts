import express from 'express';
import patientService from '../services/patientService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.findNoSsnAll());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewDiaryEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;