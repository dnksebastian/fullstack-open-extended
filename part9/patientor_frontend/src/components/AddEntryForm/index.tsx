import { useState } from "react";

import ChooseEntryView from "./ChooseEntryView";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import OccupationalHealthcareForm from "./OHealthcareForm";
import HospitalForm from "./HospitalEntryForm";

type NewEntryProps = {
    setError: React.Dispatch<React.SetStateAction<string>>
}

const NewEntryModal = (props: NewEntryProps) => {
    const [newEntryOption, setNewEntryOption] = useState('');


    switch(newEntryOption) {
        case "":
            return <ChooseEntryView setEntryOption={setNewEntryOption} />
        case "HealthCheck":
            return <HealthCheckEntryForm option={newEntryOption} setOption={setNewEntryOption} setError={props.setError}/>
        case "Occupational Healthcare":
            return <OccupationalHealthcareForm option={newEntryOption} setOption={setNewEntryOption}/>
        case "Hospital":
            return <HospitalForm option={newEntryOption} setOption={setNewEntryOption}/>
        default:
            return <ChooseEntryView setEntryOption={setNewEntryOption} />
    }

    // if(!newChosenEntry) {
    //     return (
    //         <div>
    //             <h3>Choose new entry type:</h3>
    //             <button onClick={() => {setNewChosenEntry('HealthCheck')}}>HealthCheck</button>
    //             <button onClick={() => {setNewChosenEntry('Occupational Healthcare')}}>Occupational Healthcare</button>
    //             <button onClick={() => {setNewChosenEntry('Hospital')}}>Hospital</button>
    //         </div>
    //     );
    // }
    
   
};


export default NewEntryModal;