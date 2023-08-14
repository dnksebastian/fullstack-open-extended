import patientsData from '../../data/patients';

import { v1 as uuid } from 'uuid';

import { Patient, PatientFront, NewPatientEntry } from '../types';

const getPatients = (): Patient[] => {
    return patientsData;
};

const getPublicPatients = (): PatientFront[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getSinglePublicPatient = (id:string):PatientFront | undefined => {
    const patients = getPublicPatients();
    const patient = patients.find(p => p.id === id);
    return patient;
};


const addPatient = (patient: NewPatientEntry): Patient => {
    
    const id = uuid();

    const newPatient = {
        id,
        ...patient
    };

    patientsData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPublicPatients,
    getSinglePublicPatient,
    addPatient
};