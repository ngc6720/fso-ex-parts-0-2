import { useState, useMemo } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const wrapInt = (x: number, min: number = 0, max: number = 1): number =>
  (x = x < min ? max : x > max ? min : x);

const Button = ({ onClick, children }: { onClick?: any; children?: any }) => (
  <button onClick={onClick}>{children}</button>
);

const App = () => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const favAnecdote = useMemo(() => {
    const maxPoints = Math.max(...points);
    return maxPoints === 0 ? null : anecdotes[points.indexOf(maxPoints)];
  }, [points]);

  const selectRandAnecdoteCb = () => {
    const newId = Math.floor(Math.random() * 0.99 * anecdotes.length);
    setSelected(
      newId === selected ? wrapInt(newId + 1, 0, anecdotes.length - 1) : newId
    );
  };

  const voteCb = () => {
    const pointsCopy = [...points];
    pointsCopy[selected]++;
    setPoints(pointsCopy);
  };

  return (
    <>
      <h1>FSO - Part 1 - Anecdotes</h1>
      <h2>Anecdote of the day</h2>
      <Button onClick={selectRandAnecdoteCb}>Next anecdote</Button>
      <Button onClick={voteCb}>Vote</Button>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>

      <h2>Anecdote with most votes</h2>
      <p>{favAnecdote ?? "Anecdotes have not been voted for yet"}</p>
    </>
  );
};

export default App;
