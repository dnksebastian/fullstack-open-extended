import { useState, useEffect } from 'react'
import diaryentries from './services/diaryentries';
import './App.css';

import { DiaryEntry } from './types/diaryEntryTypes';

import Header from './components/Header';
import AddEntry from "./components/AddEntry";
import EntriesList from "./components/EntriesList";
import Notifications from './components/Notifications';


const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryentries.getAll();
      setDiaries(diaries);
    };

    fetchDiaries();
  }, []);

  return (
    <div id='main-wrapper'>
    <Header />
    <Notifications errorMessage={errorMsg} setError={setErrorMsg} />
    <div className='main-helper'>
    <AddEntry allDiaries={diaries} setDiaries={setDiaries} setError={setErrorMsg}/>
    <EntriesList diaries={diaries} />
    </div>
    </div>
  )
};

export default App;
