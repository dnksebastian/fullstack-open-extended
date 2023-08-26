import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Alert, Divider } from '@mui/material';

import EntriesList from "./EntriesList";
import NewEntryModal from "../AddEntryForm";

import patientService from "../../services/patients";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';


const PatientInformation = () => {
    const id= useParams().id;
    const [patient, setPatient] = useState<any>({});
    const [entryFormVisible, setEntryFormVisible] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const hideIfVisible = { display: entryFormVisible ? 'none' : ''};
    const showIfVisible = { display: entryFormVisible ? '' : 'none' };

    useEffect(() => {
        const fetchPatientData = async () => {
            if(id) {
                const fetchedPatient = await patientService.getSinglePatient(id);
                setPatient(fetchedPatient)
            }
        };

        fetchPatientData();
    }, [id])

    if (!patient) {
        return <p>Could not find patient with entered ID.</p>
    }

    const genderIcon = () => {
        if(patient.gender === 'male') {
            return <MaleIcon />
        } else if (patient.gender === 'female') {
            return <FemaleIcon />
        } else {
            return <TransgenderIcon />
        }
    };

    return (
        <>
        <h2>{patient.name} {genderIcon()}</h2>
        <p>{patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>

        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <div style={hideIfVisible}>
          <button onClick={() => {setEntryFormVisible(true)}}>Add new entry</button>
        </div>
        <div style={showIfVisible}>
            <NewEntryModal setError={setErrorMsg}/>
        </div>     

        <Divider />   
        <EntriesList entries={patient.entries} />
        </>
    )
}

export default PatientInformation;