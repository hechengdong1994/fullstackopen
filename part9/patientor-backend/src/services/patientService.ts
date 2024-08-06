import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { Patient, NoSsnPatient, NewPatient } from '../types';


const findNoSsnAll = (): Array<NoSsnPatient> => {
  return patients.map(p => { return { ...p, ssn: null } });
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    ...entry,
    id: uuidv4()
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  findNoSsnAll,
  addPatient
};