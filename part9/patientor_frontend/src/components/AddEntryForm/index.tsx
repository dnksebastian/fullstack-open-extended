import { useState } from "react";

import ChooseEntryView from "./ChooseEntryView";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import OccupationalHealthcareForm from "./OHealthcareForm";
import HospitalForm from "./HospitalEntryForm";

import { Patient } from "../../types";

type NewEntryProps = {
    setError: (err: string) => void;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
}

const NewEntryModal = (props: NewEntryProps) => {
    const [newEntryOption, setNewEntryOption] = useState('');


    switch(newEntryOption) {
        case "":
            return <ChooseEntryView setEntryOption={setNewEntryOption} />
        case "HealthCheck":
            return <HealthCheckEntryForm option={newEntryOption} setOption={setNewEntryOption} setError={props.setError} setPatient={props.setPatient}/>
        case "OccupationalHealthcare":
            return <OccupationalHealthcareForm option={newEntryOption} setOption={setNewEntryOption} setError={props.setError} setPatient={props.setPatient} />
        case "Hospital":
            return <HospitalForm option={newEntryOption} setOption={setNewEntryOption} setError={props.setError} setPatient={props.setPatient} />
        default:
            return <ChooseEntryView setEntryOption={setNewEntryOption} />
    }
   
};


export default NewEntryModal;