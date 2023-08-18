import { Entry, EntryType } from '../types';
import { isString } from './utils';


const isEntries = (entries: unknown): entries is Entry[] => {
    return Array.isArray(entries);
};

const isEntryType = (type: string): type is EntryType => {
    return Object.values(EntryType).map(v => v.toString()).includes(type);
};

const parseEntryType = (type: unknown):EntryType => {

    if(!type || !isString(type) || !isEntryType(type)) {
        throw new Error('Incorrect or missing entry type: ' + type);
    }
    return type;
};

export const parseEntries = (entries: unknown): Entry[] => {

    if(!entries || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }

    entries.forEach(e => {
        if(!parseEntryType(e.type)) {
            throw new Error('Incorrect or missing entry type');
        }
    });

    return entries;
};