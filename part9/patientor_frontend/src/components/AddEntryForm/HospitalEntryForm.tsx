import { TextField, Grid, Button, Divider, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, SyntheticEvent } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import axios from 'axios';

import { Patient, Diagnosis } from '../../types';

import patients from '../../services/patients';
import { useParams } from 'react-router-dom';


type HospitalFormProps = {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>;
    setError: (err: string) => void;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
    diagnoses: Diagnosis[]
};

const inputStyle = {
    marginTop: 5,
    marginBottom: 20,
  }

const HospitalForm = (props: HospitalFormProps) => {
    const {setError, setOption, setPatient} = props
    const diagnoses = props.diagnoses
    const diagnosesICD = diagnoses.map(d => d.code)

    const patientID = useParams().id;
    const currentDate = dayjs()

    const [description, setDescription] = useState('');
    const [birthDate, setBirthDate] = useState(currentDate);
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const [dischargeDate, setDischargeDate] = useState(currentDate);
    const [dischargeCriteria, setDischargeCriteria] = useState('');


    const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
      const { target: { value } } = event;
      setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)
    };


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
        setBirthDate(currentDate)
        setSpecialist('')
        setDiagnosisCodes([])
        setDischargeDate(currentDate)
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


        <Divider textAlign="left">Discharge</Divider>

        <DatePicker label="Discharge date" value={dischargeDate} onChange={(newValue) => {
          if(newValue) {
            setDischargeDate(newValue)
          }
          }} />

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