// eslint-disable-next-line @typescript-eslint/no-empty-interface

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;


export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export enum EntryType {
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck"
}

export interface Discharge {
    date: string,
    criteria: string,
}

export interface SickLeave {
    startDate: string,
    endDate: string,
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    discharge: Discharge,
    type: "Hospital"
}

interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string,
    sickLeave?: SickLeave,
    type: "OccupationalHealthcare"
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

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;