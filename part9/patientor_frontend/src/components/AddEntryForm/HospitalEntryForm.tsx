import { TextField, Grid, Button, Divider } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import axios from 'axios';

import { Patient } from '../../types';

import patients from '../../services/patients';
import { useParams } from 'react-router-dom';


type HospitalFormProps = {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>;
    setError: (err: string) => void;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
};

const inputStyle = {
    marginTop: 5,
    marginBottom: 20,
  }

const HospitalForm = (props: HospitalFormProps) => {
    const {setError, setOption, setPatient} = props
    const patientID = useParams().id;

    const [description, setDescription] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');

    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');


    const submitEntryForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const newHospitalEntryObject = {
            description,
            date: birthDate,
            specialist,
            diagnosisCodes,
            type: props.option,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
            }
        }

        try {

            if(!patientID) {
             throw new Error('No patient with entered ID found')
            };
 
           const newPatient = await patients.addEntry(patientID, newHospitalEntryObject);
 
           console.log(newPatient);
           
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
        setDischargeDate('')
        setDischargeCriteria('')
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

        <Divider textAlign="left">Discharge</Divider>

        <TextField
          label="Discharge date"
          fullWidth
          value={dischargeDate}
          style={inputStyle}
          onChange={({ target }) => setDischargeDate(target.value)}
        />

        <TextField
          label="Discharge"
          fullWidth
          value={dischargeCriteria}
          style={inputStyle}
          onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default HospitalForm