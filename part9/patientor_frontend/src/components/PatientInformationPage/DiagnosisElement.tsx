import {useState, useEffect} from 'react';

import diagnosesServices from '../../services/diagnoses';
import { Diagnosis } from '../../types';

type DiagnosisElementProps = {
    diagnose: string
}

const DiagnosisElement = (props: DiagnosisElementProps) => {
    const [diagnosis, setDiagnosis] = useState<Diagnosis>();

    useEffect(() => {
        const fetchDiagnose = async () => {
            const fetchedDiagnose = await diagnosesServices.getSingleDiagnose(props.diagnose);
            setDiagnosis(fetchedDiagnose[0]);
        };

        fetchDiagnose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    if(!diagnosis) {
        return <li>{props.diagnose}</li>
    }

    return (
        <li>{props.diagnose} {diagnosis.name}</li>
    )
}

export default DiagnosisElement;