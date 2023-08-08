import { CoursePart } from "../utils/types"
import { assertNever } from "../utils/helperFunctions"

interface PartProps {
    part: CoursePart
}

const Part = (props: PartProps) => {
    switch(props.part.kind) {
        case "basic":
            return <div>
                <b><p>{props.part.name} <span>{props.part.exerciseCount}</span></p></b>
                <i><p>{props.part.description}</p></i>
            </div>
        case "group":
            return <div>
            <b><p>{props.part.name} <span>{props.part.exerciseCount}</span></p></b>
            <i><p>project exercises <span>{props.part.groupProjectCount}</span></p></i>
        </div>
        case "background":
            return <div>
                <b><p>{props.part.name} <span>{props.part.exerciseCount}</span></p></b>
                <i><p>{props.part.description}</p></i>
                <p>submit to <span>{props.part.backgroundMaterial}</span></p>
            </div>
        case "special":
            return <div>
            <b><p>{props.part.name} <span>{props.part.exerciseCount}</span></p></b>
            <i><p>{props.part.description}</p></i>
            <p>required skills: {props.part.requirements.join(', ')}</p>
        </div>
        default:
            return assertNever(props.part);
    }
}

export default Part;