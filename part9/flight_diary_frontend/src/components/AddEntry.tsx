import { useState, useRef } from 'react'
import axios from 'axios';

import diaryentries from '../services/diaryentries';
import { DiaryEntry, Weather, Visibility, initialEmptyDiary } from '../types/diaryEntryTypes';

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

    const [formInput, setFormInput] = useState<initialEmptyDiary>(INITIAL_FORM);

    const diaries = props.allDiaries;
    const displayError = props.setError;

    const formRef = useRef<HTMLFormElement>(null);

    const visibilityOptions:Visibility[] = ['great', 'good', 'ok', 'poor'];
    const weatherOptions:Weather[] = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];

    const handleFormChange = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement

        if(target.id === 'date') {
            setFormInput({...formInput, date: target.value})
        } else if(target.name === 'visibility-option') {
            setFormInput({...formInput, visibility: target.value})
        } else if(target.name === 'weather-option') {
            setFormInput({...formInput, weather: target.value})
        } else {
            setFormInput({...formInput,
                [target.id]: target.value
            });
        }
    };


    const submitForm = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const addedEntry = await diaryentries.addEntry(formInput);
            props.setDiaries(diaries.concat(addedEntry))
            setFormInput(INITIAL_FORM);

            if(formRef.current !== null) {
                formRef.current.reset()
            }
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
        <form onSubmit={submitForm} ref={formRef}>

            <label style={labelStyles}>
                <span>date</span>
                <input type="date" id='date' name='date' onChange={handleFormChange}/>
            </label>

            <label style={labelStyles}>
                <span>visibility</span>
                {visibilityOptions.map(el => {
                    return <div key={el}>
                        <input type='radio' name='visibility-option' value={el} onChange={handleFormChange}/>
                        <span>{el}</span>
                        </div>
                })}
            </label>

            <label style={labelStyles}>
                <span>weather</span>
                {weatherOptions.map(el => {
                    return <div key={el}>
                        <input type="radio" name='weather-option' value={el} onChange={handleFormChange}/>
                        <span>{el}</span>
                    </div>
                })}
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