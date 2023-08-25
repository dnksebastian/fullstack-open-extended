import patientsData from '../../data/patients-full';

import { v1 as uuid } from 'uuid';

import { Patient, PatientFront, NewPatientEntry, EntryWithoutId } from '../types';

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

const getSinglePatient = (id:string):Patient | undefined => {
    const patients = getPatients();
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

const addEntry = (patient: Patient, newEntry: EntryWithoutId): Patient => {

    const entryToAdd = { ...newEntry, id: uuid() };

    const updatedPatient = { ...patient, entries: patient.entries.concat(entryToAdd) };

    patientsData.map(p => p.id === updatedPatient.id ? updatedPatient : p);

    return updatedPatient;
};

export default {
    getPatients,
    getPublicPatients,
    getSinglePatient,
    addPatient,
    addEntry
};