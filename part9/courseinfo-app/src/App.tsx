import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts = [
      {
        name: "Fundamentals",
        exerciseCount: 10
      },
      {
        name: "Using props to pass data",
        exerciseCount: 7
      },
      {
        name: "Deeper type usage",
        exerciseCount: 14
      }
    ];

    const exerciseSum = courseParts.reduce((acc, course) => {
      return acc + course.exerciseCount;
    }, 0);


  
    return (
      <div>
        <Header name={courseName} />
        <Content parts={courseParts} />
        <Total exercises={exerciseSum}/>
        {/* <h1>{courseName}</h1>
        <p>
          {courseParts[0].name} {courseParts[0].exerciseCount}
        </p>
        <p>
          {courseParts[1].name} {courseParts[1].exerciseCount}
        </p>
        <p>
          {courseParts[2].name} {courseParts[2].exerciseCount}
        </p>
        <p>
          Number of exercises{" "}
          {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p> */}
      </div>
    );
  };
  
  export default App;