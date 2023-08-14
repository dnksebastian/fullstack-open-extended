import axios from "axios";
import { DiaryEntry, NewDiaryEntry, initialEmptyDiary } from "../types/diaryEntryTypes";

const baseURL = 'http://localhost:3001/api'

const getAll = async () => {
    const { data } = await axios.get<DiaryEntry[]>(`${baseURL}/diaries`);
    return data;
};

const addEntry = async (obj: NewDiaryEntry | initialEmptyDiary ) => {
    const newEntry = await axios.post<DiaryEntry>(`${baseURL}/diaries`, obj)
    return newEntry.data
};


export default {
    getAll,
    addEntry
}