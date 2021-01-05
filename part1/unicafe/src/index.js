import React, { useState } from "react";
import ReactDOM from "react-dom";
const Header = (props) => {
  return <h1>{props.head}</h1>;
};
const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const avg = (props.good - props.bad) / all;
  const positive = (props.good * 100) / all;
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={avg} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodfb = () => {
    setGood(good + 1);
  };
  const neutralfb = () => {
    setNeutral(neutral + 1);
  };
  const badfb = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header head="give feedback" />
      <Button handleClick={goodfb} text="good" />
      <Button handleClick={neutralfb} text="neutral" />
      <Button handleClick={badfb} text="bad" />
      <Header head="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
