import { Reveal, Section } from "./ui";
import { fmt } from "../format";

function StatsCard({ title, unit, s, hDigits, delay }) {
  const f = (v, d = hDigits) => `${fmt(v, d)}${unit}`;
  const rows = [
    ["Mean", f(s.mean), fmt(s.mean, 4)],
    ["Median", f(s.median, s.median % 1 ? 2 : 0), fmt(s.median, 4)],
    ["Minimum", f(s.min, 0), fmt(s.min, 4)],
    ["Maximum", f(s.max, 0), fmt(s.max, 4)],
    ["Standard deviation", unit === "%" ? fmt(s.sd, 2) : f(s.sd), fmt(s.sd, 4)],
  ];
  return (
    <Reveal className="card" delay={delay}>
      <h3>{title}</h3>
      <table className="stat-table">
        <caption className="sr-only">{title}: descriptive statistics, n = {s.n}</caption>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
          ))}
        </tbody>
      </table>
      <details className="precise">
        <summary>Show more precise values</summary>
        <ul>
          {rows.map(([k, , p]) => <li key={k}><span>{k}</span><code>{p}</code></li>)}
        </ul>
      </details>
    </Reveal>
  );
}

export default function DescriptiveStatistics({ a }) {
  return (
    <Section
      id="statistics"
      step="03 · What does the data look like?"
      title="Descriptive statistics"
      intro={`Summary of the ${a.n} valid observations. The sample standard deviation divides by n − 1.`}
    >
      <div className="two-col">
        <StatsCard title="Music listening" unit=" h" s={a.hoursStats} hDigits={2} delay={0} />
        <StatsCard title="Test score" unit="%" s={a.scoreStats} hDigits={2} delay={100} />
      </div>
    </Section>
  );
}
