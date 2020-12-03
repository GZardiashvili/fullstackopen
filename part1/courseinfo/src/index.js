import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.tavi.name}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part prt={props.nawilebi[0]} />
      <Part prt={props.nawilebi[1]} />
      <Part prt={props.nawilebi[2]} />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.prt.name} {props.prt.exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.jami[0].exercises +
        props.jami[1].exercises +
        props.jami[2].exercises}{" "}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header tavi={course} />
      <Content nawilebi={course.parts} />
      <Total jami={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
