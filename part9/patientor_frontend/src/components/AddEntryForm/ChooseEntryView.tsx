type ChooseEntryViewProps = {
    setEntryOption: React.Dispatch<React.SetStateAction<string>>
};

const ChooseEntryView = (props: ChooseEntryViewProps) => {
   
    const setNewChosenEntry = props.setEntryOption;
      
    return (
            <div>
                <h3>Choose new entry type:</h3>
                <button onClick={() => {setNewChosenEntry('HealthCheck')}}>HealthCheck</button>
                <button onClick={() => {setNewChosenEntry('Occupational Healthcare')}}>Occupational Healthcare</button>
                <button onClick={() => {setNewChosenEntry('Hospital')}}>Hospital</button>
            </div>
        );
};

export default ChooseEntryView;