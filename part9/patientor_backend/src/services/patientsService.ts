import patientsData from '../../data/patients';

import { Patient, PatientFront } from '../types';

const getPatients = (): Patient[] => {
    return patientsData;
};

const getPublicPatients = (): PatientFront[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients,
    getPublicPatients
};