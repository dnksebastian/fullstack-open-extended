import { TextField, Grid, Button, MenuItem, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { useState, SyntheticEvent } from 'react';
import axios from 'axios';

import { Patient, HealthCheckRating, Diagnosis } from '../../types';

import patients from '../../services/patients';
import { useParams } from 'react-router-dom';

type HealthCheckRatingProps = {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>;
    setError: (err: string) => void;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
    diagnoses: Diagnosis[]
};


const inputStyle = {
  marginTop: 5,
  marginBottom: 20,
}

const HealthCheckEntryForm = (props: HealthCheckRatingProps) => {
    const setOption = props.setOption;
    const setError = props.setError;
    const setPatient = props.setPatient;

    const diagnoses = props.diagnoses
    const diagnosesICD = diagnoses.map(d => d.code)

    const patientID = useParams().id;

    const currentDate = dayjs()

    const [description, setDescription] = useState('');
    const [birthDate, setBirthDate] = useState(currentDate);
    const [specialist, setSpecialist] = useState('');
    const [healthRating, setHealthRating] = useState<HealthCheckRating | string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);


    const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
      const { target: { value } } = event;
      setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)
    };


    const onHealthRatingChange = (event: SelectChangeEvent<HealthCheckRating | string>) => {
      event.preventDefault()
      if (typeof event.target.value === "number") {
      const value = event.target.value;

      const healthRatingVal = Object.values(HealthCheckRating).filter(v => !isNaN(Number(v))).find(g => g === value);

      if (healthRatingVal || healthRatingVal === 0) {
        setHealthRating(healthRatingVal);
      }
      }
    }

    interface HealthCheckRatingOption {
      value: HealthCheckRating | string;
      label: number;
    }

  const healthRatings = Object.keys(HealthCheckRating).filter(v => isNaN(Number(v)))
  
  const healthCheckRatingOptions: HealthCheckRatingOption[] = healthRatings.map((v, i) => ({
    value: v, label: i
  }))


    const submitEntryForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const newHealthCheckEntryObject = {
          description,
          date: birthDate,
          specialist,
          healthCheckRating: +healthRating,
          diagnosisCodes,
          type: props.option
        }

        try {

           if(!patientID) {
            throw new Error('No patient with entered ID found')
           };

          const newPatient = await patients.addEntry(patientID, newHealthCheckEntryObject);
          
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
        setDescription('')
        setBirthDate(currentDate);
        setSpecialist('')
        setHealthRating(HealthCheckRating.Healthy)
        setDiagnosisCodes([])
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

        <DatePicker label="Birth date" value={birthDate} onChange={(newValue) => {
          if(newValue) {
            setBirthDate(newValue)
          }
          }} />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          style={inputStyle}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel id="healthcheck-select">Healthcheck rating</InputLabel>

        <Select
        style={inputStyle}
        labelId='healthcheck-select'
        fullWidth
        value={healthRating}
        onChange={onHealthRatingChange}
        >
          {healthCheckRatingOptions.map(option => <MenuItem key={option.label} value={option.label}>{option.value}</MenuItem>)}

        </Select>

        {/* <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          style={inputStyle}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        /> */}

        <InputLabel id="diagnosis-codes-select">Diagnoses</InputLabel>
        <Select
        style={inputStyle}
        labelId='diagnosis-codes-select'
        fullWidth
        multiple
        value={diagnosisCodes}
        onChange={handleDiagnosisCodesChange}
        >
          {diagnosesICD.map(diagnose => (
            <MenuItem key={diagnose} value={diagnose}>{diagnose}</MenuItem>
          ))}
        </Select>

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