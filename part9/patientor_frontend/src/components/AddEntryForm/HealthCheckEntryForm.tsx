import {  TextField, Grid, Button } from '@mui/material';
import { useState, SyntheticEvent } from 'react';

import patients from '../../services/patients';
import { useParams } from 'react-router-dom';

type HealthCheckRatingProps = {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string>>
};


const inputStyle = {
  marginTop: 5,
  marginBottom: 20,
}

const HealthCheckEntryForm = (props: HealthCheckRatingProps) => {
    const setOption = props.setOption;
    // const setError = props.setError;
    const patientID = useParams().id;

    const [description, setDescription] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthRating, setHealthRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');


    const submitEntryForm = (event: SyntheticEvent) => {
        event.preventDefault();

        const newHealthCheckEntryObject = {
          description,
          date: birthDate,
          specialist,
          healthCheckRating: +healthRating,
          diagnosisCodes,
          type: props.option
        }

        if(patientID) {
          patients.addEntry(patientID, newHealthCheckEntryObject);
        }

      };
      
      const onCancel = (event: SyntheticEvent) => {
        event.preventDefault();
        setDescription('')
        setBirthDate('')
        setSpecialist('')
        setHealthRating('')
        setDiagnosisCodes('')
        setOption('')
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
          label="Healthcheck rating"
          fullWidth
          value={healthRating}
          style={inputStyle}
          onChange={({ target }) => setHealthRating(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          style={inputStyle}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
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

export default HealthCheckEntryForm