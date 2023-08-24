// eslint-disable-next-line @typescript-eslint/no-empty-interface

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
    // type: EntryType;
    diagnosisCodes?: Array<Diagnose['code']>;
}
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    // type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    discharge: Discharge,
    type: "Hospital"
    // type: EntryType.Hospital
}

interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string,
    sickLeave?: SickLeave,
    type: "OccupationalHealthcare"
    // type: EntryType.OccupationalHealthcare
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

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type NewEntryBase = Omit<BaseEntry ,"id">;

// Define special omit for unions
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type UnionOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;