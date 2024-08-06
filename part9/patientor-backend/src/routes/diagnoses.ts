import express from 'express';
import diagnosesService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.findAll());
});

export default router;