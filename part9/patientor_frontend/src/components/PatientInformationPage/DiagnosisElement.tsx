import { Diagnosis } from "../../types";

type DiagnosisElProps = {
    diagnoses: Diagnosis[];
    diagnoseCode: string;
}

const DiagnosisElement = (props: DiagnosisElProps) => {
    const diagnoseCode = props.diagnoseCode;
    const diagnoses = props.diagnoses;

    const codeDescription = diagnoses.find(d => d.code === diagnoseCode)

    if (!props) {
        return <></>
    };

    return (
        <li>{diagnoseCode} {codeDescription?.name}</li>
    )
}

export default DiagnosisElement;