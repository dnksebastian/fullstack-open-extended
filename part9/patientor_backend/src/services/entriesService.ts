// import patientsData from '../../data/patients-full';

import { Entry } from "../types";

const addEntry = (entryObj:Entry) => {
    console.log(entryObj);
};



export default {
    addEntry
};



// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
//     if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
//       we will just trust the data to be in correct form
//       return [] as Array<Diagnosis['code']>;
//     }
  
//     return object.diagnosisCodes as Array<Diagnosis['code']>;
//   };