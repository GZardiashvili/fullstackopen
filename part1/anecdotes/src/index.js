import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Vote = (props) => {
  return <div>has {props.vote} votes</div>;
};

const App = (props) => {
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const randomAnecdote = () => {
    const rnd = Math.floor(Math.random() * Math.floor(anecdotes.length));
    setSelected(rnd);
  };

  const voteAnecdote = () => {
    const _votes = [...votes];
    _votes[selected] += 1;
    setVote(_votes);
  };

  const mostVoted = votes.indexOf(Math.max(...votes));

  console.log(mostVoted);

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{props.anecdotes[selected]}</p>
      <Vote vote={votes[selected]} />
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={randomAnecdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <p>{props.anecdotes[mostVoted]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
