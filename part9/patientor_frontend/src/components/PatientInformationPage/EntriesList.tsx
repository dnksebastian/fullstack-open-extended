import {useEffect, useState} from 'react'

import EntryDetails from './EntryDetails';

import { Entry, Diagnosis } from '../../types'

import diagnosesServices from '../../services/diagnoses';
import DiagnosisElement from "./DiagnosisElement";

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
        };

        fetchDiagnoses();
    }, []);
    
    if (!entries || entries.length === 0) {
        return <p>No entries found...</p>
    };

    return (
        <>
        <h2>entries</h2>
        {/* {entries.map(e => {
            return <div key={e.id}>
                <p><span>{e.date}</span> {e.description}</p>

                {e.diagnosisCodes ? <ul>
                    {e.diagnosisCodes.map(c => 
                    <DiagnosisElement key={c} diagnoses={diagnoses} diagnoseCode={c} />
                    )}
                </ul> : null}
            </div>
        })} */}

        {
         entries.map(e => <EntryDetails key={e.id} entry={e}/>)
        }
        </>
    )
}

export default EntriesList