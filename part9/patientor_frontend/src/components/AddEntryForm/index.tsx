import { useState, useEffect } from "react";

import ChooseEntryView from "./ChooseEntryView";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import OccupationalHealthcareForm from "./OHealthcareForm";
import HospitalForm from "./HospitalEntryForm";

import { Patient, Diagnosis } from "../../types";
import diagnosesServices from '../../services/diagnoses';


type NewEntryProps = {
    setError: (err: string) => void;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
}

const NewEntryModal = (props: NewEntryProps) => {
    const [newEntryOption, setNewEntryOption] = useState('');
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const fetchedDiagnoses = await diagnosesServices.getAllDiagnoses();
            setDiagnoses(fetchedDiagnoses);
        };

        fetchDiagnoses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    switch(newEntryOption) {
        case "":
            return <ChooseEntryView setEntryOption={setNewEntryOption} />
        case "HealthCheck":
            return <HealthCheckEntryForm option={newEntryOption} setOption={setNewEntryOption} setError={props.setError} setPatient={props.setPatient} diagnoses={diagnoses}/>
        case "OccupationalHealthcare":
            return <OccupationalHealthcareForm option={newEntryOption} setOption={setNewEntryOption} setError={props.setError} setPatient={props.setPatient} />
        case "Hospital":
            return <HospitalForm option={newEntryOption} setOption={setNewEntryOption} setError={props.setError} setPatient={props.setPatient} />
        default:
            return <ChooseEntryView setEntryOption={setNewEntryOption} />
    }
   
};


export default NewEntryModal;