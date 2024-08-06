import diagnoses from '../../data/diagnoses.json';

import { Diagnose } from '../types';

const findAll = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  findAll
};