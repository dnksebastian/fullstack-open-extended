import { CoursePart } from "../utils/types";

import Part from "./Part";

interface ContentProps {
    parts: CoursePart[]
}

const Content = (props: ContentProps) => {

    const allParts= props.parts;

    return (
        <ul>        
            {allParts.map(part => 
                <li key={part.name}>
                    <Part part={part} />
                </li>
            )}
        </ul>
    );
};

export default Content;