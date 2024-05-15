import { useState, useMemo } from "react";

interface Stat {
  name: string;
  value: number;
  type?: string;
}

const Button = ({ onClick, children }: { onClick?: any; children?: any }) => (
  <button onClick={onClick}>{children}</button>
);

const Statistics = ({
  stats,
  hasStats,
}: {
  stats: Array<Stat>;
  hasStats: boolean;
}) =>
  !hasStats ? (
    <p>No feedback given</p>
  ) : (
    <table>
      <caption>Users feedback</caption>
      <tbody>
        {stats.map((stat) => (
          <StatisticLine key={stat.name} stat={stat}></StatisticLine>
        ))}
      </tbody>
    </table>
  );

const StatisticLine = ({
  stat: { name, value, type = "" },
}: {
  stat: Stat;
}) => (
  <tr>
    <td>{name}</td>
    <td>
      {value} {type}
    </td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = useMemo(() => good + neutral + bad, [good, neutral, bad]);
  const stats: Array<Stat> = useMemo(
    () => [
      { name: "good", value: good },
      { name: "neutral", value: neutral },
      { name: "bad", value: bad },
      { name: "all", value: all },
      { name: "average", value: (good - bad) / all },
      { name: "positive", value: (good / all) * 100, type: "%" },
    ],
    [good, neutral, bad, all]
  );

  const inc = (x: number): number => x + 1;

  const incCb = {
    good: () => setGood(inc(good)),
    neutral: () => setNeutral(inc(neutral)),
    bad: () => setBad(inc(bad)),
  };

  return (
    <>
      <h1>FSO - Part 1 - Unicafe</h1>
      <h2>Give Feedback</h2>
      <Button onClick={incCb.good}>Good</Button>
      <Button onClick={incCb.neutral}>Neutral</Button>
      <Button onClick={incCb.bad}>Bad</Button>

      <h2>Statistics</h2>
      <Statistics stats={stats} hasStats={all > 0}></Statistics>
    </>
  );
};

export default App;
