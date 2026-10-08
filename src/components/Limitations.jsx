import { Reveal } from "./ui";

const LIMITS = [
  "The sample size is relatively small.",
  "Data are self-reported.",
  "Only one test score was recorded per participant.",
  "The study uses observational data.",
  "Correlation does not establish causation.",
  "Only music listening duration was studied.",
  "Type of music and study conditions were not measured.",
];
const NEXT = [
  "Compare different types of music.",
  "Compare studying with and without music.",
  "Collect study-time data.",
  "Collect data from a larger sample.",
  "Distinguish instrumental music from music with lyrics.",
];

export default function Limitations() {
  return (
    <div className="block">
      <Reveal>
        <h3>Limitations &amp; Next Steps</h3>
      </Reveal>
      <div className="two-col">
        <Reveal className="card">
          <h4>Limitations</h4>
          <ul className="ticks dots">{LIMITS.map((t) => <li key={t}>{t}</li>)}</ul>
        </Reveal>
        <Reveal className="card" delay={100}>
          <h4>Future research</h4>
          <ul className="ticks arrows">{NEXT.map((t) => <li key={t}>{t}</li>)}</ul>
        </Reveal>
      </div>
    </div>
  );
}
