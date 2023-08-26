type OccupationalHealthcareFormProps = {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>
};

const OccupationalHealthcareForm = (props: OccupationalHealthcareFormProps) => {
    const setOption = props.setOption;

     return (
        <>
        <h3>New {props.option} entry</h3>
        new entry modal...
        <button onClick={() => {setOption('')}}>Choose other entry type</button>
        </>
    );
}

export default OccupationalHealthcareForm