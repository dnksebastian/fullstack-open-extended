interface TotalProps {
    exercises: number;
}

const Total = (props: TotalProps) => {
    return (
        <div>Number of exercises {props.exercises}</div>
    );
};

export default Total;