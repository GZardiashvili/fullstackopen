import React from "react";

const Header = (props) => {
  return <h2>{props.course.name}</h2>;
};

const Total = ({ course }) => {
  const reducer = (acc, cur) => acc + cur;
  const sum = course.parts.map((part) => part.exercises);
  const s = sum.reduce(reducer);
  return <h4>Number of exercises {s}</h4>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  );
};

// const Courses = (props) => {
//   return props.courses.map((crs) => <Course key={crs.id} course={crs} />);
// };

export default Course;
