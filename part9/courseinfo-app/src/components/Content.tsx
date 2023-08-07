interface ContentProps {
    parts: CoursePart[]
}

interface CoursePart {
    name: string;
    exerciseCount: number;
  }

const Content = (props: ContentProps) => {

    const allParts= props.parts;

    return (
        <ul>
            {allParts.map(part => 
                <li key={part.name}><span>{part.name}</span> <span>{part.exerciseCount}</span></li>
            )}
        </ul>
    );
};

export default Content;