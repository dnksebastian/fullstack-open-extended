// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface Entry {
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export type PatientFront = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;