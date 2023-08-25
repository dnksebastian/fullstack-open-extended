import { Entry, Diagnose, NewEntryBase, EntryWithoutId, Discharge, HealthCheckRating, SickLeave } from '../types';
import { isNumber, parseDate, parseString} from './universal_utils';


const isEntry = (entry: unknown): entry is Entry => {
    
    if(!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if(!('type' in entry && 'description' in entry && 'date' in entry && 'specialist' in entry)) {
        throw new Error('Incorrect or missing entry data');
    }

    if(entry.type === 'Hospital' || entry.type === 'HealthCheck' || entry.type === 'OccupationalHealthcare') {
        return true;
    } else {
        return false;
    }


};

export const parseEntries = (entries: unknown): Entry[] => {

    if(!Array.isArray(entries)) {
        throw new Error('Invalid or missing entry data');
    }

    if(!entries || !entries.every(e => isEntry(e))) {
        throw new Error('Invalid or missing entries');
    }

    return entries as Entry[];
};

// const isEntryType = (type: string): type is EntryType => {
//     return Object.values(EntryType).map(v => v.toString()).includes(type);
// };

// const parseEntryType = (type: unknown):EntryType => {

//     if(!type || !isString(type) || !isEntryType(type)) {
//         throw new Error('Incorrect or missing entry type: ' + type);
//     }

//     return type;
// };


const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnose['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnose['code']>;
  };

const parseDischarge = (discharge: unknown): Discharge => {
    
    if (!discharge || typeof discharge !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('date' in discharge && 'criteria' in discharge) {
        const dischargeObj:Discharge = {
            date: parseDate(discharge.date, 'Discharge date'),
            criteria: parseString(discharge.criteria, 'Discharge info')
        };

        return dischargeObj;
    }

    throw new Error('Incorrect or missing discharge data');
};



const isHealthRating = (rating: number): rating is HealthCheckRating => {

    // if(!rating || !isNumber(rating)) {
    //     throw new Error('Invalid health rating');
    // }

    // return Object.values(HealthCheckRating).includes(rating);

    // if (rating && isNumber(rating)) {
    //     console.log(rating);
    //     return Object.values(HealthCheckRating).includes(rating);
    // }
    // else {
    //     throw new Error('Invalid health rating');
    // }

    return Object.values(HealthCheckRating).map(val => val as number).includes(rating);
};


const parseHealthRating = (rating: unknown): HealthCheckRating => {
    const acceptedValues = [0, 1, 2, 3];

    if(isNumber(rating) && acceptedValues.includes(rating) && isHealthRating(rating)) {
        return rating;
    } else {
        throw new Error('Missing or incorrect healthcheck rating');
    }

    // if(!rating || !isHealthRating(rating)) {
    //     throw new Error('Missing or incorrect healthcheck rating');
    // }

    // return rating;
};

const parseSickLeave = (sickleave: unknown): SickLeave => {
    
    if (!sickleave || typeof sickleave !== 'object') {
        throw new Error('Incorrect or missing sickleave data');
    }

    if ('startDate' in sickleave && 'endDate' in sickleave) {
        const sickLeaveObj:SickLeave = {
            startDate:parseDate(sickleave.startDate, 'SickLeave start'),
            endDate: parseDate(sickleave.endDate, 'SickLeave end')
        };

        return sickLeaveObj;
    }

    throw new Error('Incorrect or missing SickLeave data');
};


export const toNewEntry = (object: unknown): EntryWithoutId => {

    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {

        const newBaseEntry: NewEntryBase = {
            description: parseString(object.description, 'description'),
            date: parseDate(object.date, 'date'),
            specialist: parseString(object.specialist, 'specialist'),
            // type: parseEntryType(object.type)
        };

        if('diagnosisCodes' in object) {
            newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }

        switch(object.type) {
            case "Hospital":
                if('discharge' in object) {
                    return {
                        ...newBaseEntry,
                        type: object.type,
                        discharge: parseDischarge(object.discharge)
                    };
                } else {
                    throw new Error('Incorrect or missing entry data');
                }                
                case "OccupationalHealthcare":
                    if ('sickLeave' in object && 'employerName' in object) {
                        return {
                            ...newBaseEntry,
                            type: object.type,
                            sickLeave: parseSickLeave(object.sickLeave),
                            employerName: parseString(object.employerName, 'Employer name')
                        };
                    } else if (!('sickLeave' in object) && 'employerName' in object) {
                    return {
                        ...newBaseEntry,
                        type: object.type,
                        employerName: parseString(object.employerName, 'Employer name')
                    };

                } else {
                    throw new Error('Incorrect or missing entry data');
                }
                case "HealthCheck":
                if ('healthCheckRating' in object) {
                    return {
                        ...newBaseEntry,
                        type: object.type,
                        healthCheckRating: parseHealthRating(object.healthCheckRating)
                    };
                } else {
                throw new Error('Incorrect or missing entry data');
                }
            default:
                throw new Error('Incorrect or missing entry');
        }
    }

    throw new Error('Incorrect data: some fields are missing!');

};
