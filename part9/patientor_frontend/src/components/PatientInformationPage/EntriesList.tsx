import { Entry } from '../../types'

import DiagnosisElement from "./DiagnosisElement";

type EntriesProps = {
    entries: Entry[];
}

const EntriesList = (props: EntriesProps) => {
    const entries = props.entries;
    
    if (!entries || entries.length === 0) {
        return <p>No entries found...</p>
    };
    
    return (
        <>
        <h2>entries</h2>
        {entries.map(e => {
            return <div key={e.id}>
                <p><span>{e.date}</span> {e.description}</p>

                {e.diagnosisCodes ? <ul>
                    {e.diagnosisCodes.map(c => 
                    <DiagnosisElement key={c} diagnose={c}/>
                    )}
                </ul> : null}
            </div>
        })}
        </>
    )
}

export default EntriesList