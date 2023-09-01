import {useEffect, useState} from 'react'

import EntryDetails from './EntryDetails';

import { Entry, Diagnosis } from '../../types'

import diagnosesServices from '../../services/diagnoses';

type EntriesProps = {
    entries: Entry[];
}

const EntriesList = (props: EntriesProps) => {
    const entries = props.entries;
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const fetchedDiagnoses = await diagnosesServices.getAllDiagnoses();
            setDiagnoses(fetchedDiagnoses);
            console.log(diagnoses);
        };

        fetchDiagnoses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if (!entries || entries.length === 0) {
        return <p>No entries found...</p>
    };

    return (
        <>
        <h2>entries</h2>
        {
         entries.map(e => <EntryDetails key={e.id} entry={e}/>)
        }
        </>
    )
}

export default EntriesList