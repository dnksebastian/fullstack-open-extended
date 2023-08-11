import { useState, useEffect } from 'react'
import diaryentries from '../services/diaryentries';

import { DiaryEntry } from '../types/diaryEntryTypes';
import axios from 'axios';

interface AddEntryProps {
    allDiaries: DiaryEntry[],
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>,
    setError: React.Dispatch<React.SetStateAction<string>>
}

const INITIAL_FORM = {
    date: '',
    visibility: '',
    weather: '',
    comment: '',
}

const labelStyles = {
    display: "block",
    marginBottom: 10,
}



const AddEntry = (props: AddEntryProps) => {

    const [formInput, setFormInput] = useState(INITIAL_FORM);
    const diaries = props.allDiaries;
    const displayError = props.setError;

    useEffect(() => {
        console.log(formInput);
    }, [formInput])

    const handleFormChange = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement

        setFormInput({...formInput,
            [target.id]: target.value
        });
    };

    const submitForm = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const addedEntry = await diaryentries.addEntry(formInput);
            props.setDiaries(diaries.concat(addedEntry))
            setFormInput(INITIAL_FORM);
        }
        catch(error: unknown) {
            if(axios.isAxiosError(error)) {
                if(error?.response?.data && typeof error?.response?.data === 'string') {
                    const message = error.response.data.replace('Something went wrong. Error: ', '');
                    displayError(message);
                } else {
                    displayError('Unrecognized axios error');
                }
            } else {
                displayError("Unknown error: " + error)
            }
        }
    };

    return (
        <div className="diary-form-wrap">
        <h2>Add new entry</h2>
        <form onSubmit={submitForm}>
            <label style={labelStyles}>
                <span>date</span>
                <input type="text" id='date' name='date' value={formInput.date} onChange={handleFormChange}/>
            </label>
            <label style={labelStyles}>
                <span>visibility</span>
                <input type="text" id='visibility' name='visibility' value={formInput.visibility} onChange={handleFormChange}/>
            </label>
            <label style={labelStyles}>
                <span>weather</span>
                <input type="text" id='weather' name='weather' value={formInput.weather} onChange={handleFormChange}/>
            </label>
            <label style={labelStyles}>
                <span>comment</span>
                <input type="text" id='comment' name='comment' value={formInput.comment} onChange={handleFormChange}/>
            </label>
            <button type="submit">add</button>
        </form>
        </div>
    )
}

export default AddEntry;