import { TextField, Grid, Button, Divider } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import axios from 'axios';

import { Patient } from "../../types";

import patients from '../../services/patients';
import { useParams } from "react-router-dom";

type OccupationalHealthcareFormProps = {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>;
    setError: (err: string) => void;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
};

const inputStyle = {
    marginTop: 5,
    marginBottom: 20,
  }
  

const OccupationalHealthcareForm = (props: OccupationalHealthcareFormProps) => {

    const {setError, setOption, setPatient} = props
    const patientID = useParams().id;

    const [description, setDescription] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
   
    const [employer, setEmployer] = useState('');

    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');


    const submitEntryForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const newOccupationalHealthcareEntryObject = {
          description,
          date: birthDate,
          specialist,
          diagnosisCodes,
          type: props.option,
          employerName: employer,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          }
      }

      try {

          if(!patientID) {
           throw new Error('No patient with entered ID found')
          };

         const newPatient = await patients.addEntry(patientID, newOccupationalHealthcareEntryObject);
         
         setPatient(newPatient);
       }
       catch(e: unknown){
         if(axios.isAxiosError(e)) {
           if(e?.response?.data && typeof e?.response?.data === 'string') {
             const message = e.response.data.replace('Something went wrong:  Error: ', '');
             console.error(message);
             setError(message);
           } else {
             setError('Unrecognized axios error')
           }
         } else {
           setError('Unknown error');
         }
       }

    };

    const onCancel = (event: SyntheticEvent) => {
        event.preventDefault();
        setOption('');
        setDescription('')
        setBirthDate('')
        setSpecialist('')
        setDiagnosisCodes('')
        setEmployer('')
        setSickLeaveStart('')
        setSickLeaveEnd('')
    };

     return (
        <>
        <h3>New {props.option} entry</h3>
        <form onSubmit={submitEntryForm}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          style={inputStyle}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={birthDate}
          style={inputStyle}
          onChange={({ target }) => setBirthDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          style={inputStyle}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          style={inputStyle}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

        <TextField
          label="Employer"
          fullWidth
          value={employer}
          style={inputStyle}
          onChange={({ target }) => setEmployer(target.value)}
        />

        <Divider textAlign="left">Sickleave</Divider>
        
        <TextField
          label="Sick Leave Start"
          fullWidth
          value={sickLeaveStart}
          style={inputStyle}
          onChange={({ target }) => setSickLeaveStart(target.value)}
        />

        <TextField
          label="Sick Leave End"
          fullWidth
          value={sickLeaveEnd}
          style={inputStyle}
          onChange={({ target }) => setSickLeaveEnd(target.value)}
        />

        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
        </form>
        <Button onClick={() => {setOption('')}}>Choose other entry type</Button>
        </>
    );
}

export default OccupationalHealthcareForm