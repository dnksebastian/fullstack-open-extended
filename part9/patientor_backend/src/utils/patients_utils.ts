import { NewPatientEntry, Gender } from "../types";
import { parseEntries } from "./entries_utils";
import {isString, parseDate, parseString} from './universal_utils';


const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};


const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {

    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        
        const newPatient: NewPatientEntry = {
            name: parseString(object.name, 'name'),
            dateOfBirth: parseDate(object.dateOfBirth, 'birth'),
            ssn: parseString(object.ssn, 'ssn'),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation, 'occupation'),
            entries: parseEntries(object.entries)
        };

        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing!');
};

export default toNewPatientEntry;