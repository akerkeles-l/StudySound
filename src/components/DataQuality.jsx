import { Reveal } from "./ui";

export default function DataQuality({ a }) {
  // Valid-but-unusual scores (kept, because they are numbers inside 0-100%).
  const lowScores = a.valid.map((d) => d.testScore).filter((s) => s <= 5).sort((x, y) => x - y);

  return (
    <div className="block">
      <Reveal>
        <h3>Data quality</h3>
        <p className="prose">
          Before analysis, the dataset was checked for invalid or non-numeric values. Two
          responses could not be included in the numerical analysis. They remain part of the raw
          dataset but were excluded from calculations. No value was edited or replaced.
        </p>
      </Reveal>

      <Reveal className="flow" delay={80}>
        <div className="flow-step">
          <span className="flow-num">{a.rawCount}</span>
          <span>Raw sample<br />responses</span>
        </div>
        <span className="flow-op" aria-hidden="true">−</span>
        <div className="flow-step muted">
          <span className="flow-num">{a.excluded.length}</span>
          <span>Excluded during<br />validation</span>
        </div>
        <span className="flow-op" aria-hidden="true">=</span>
        <div className="flow-step hi">
          <span className="flow-num">{a.n}</span>
          <span>Valid analytical<br />sample</span>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <ul className="excluded-list">
          {a.excluded.map((e) => (
            <li key={e.index}>
              <code>{e.shown ?? "–"}</code>
              <span>
                {e.shown && e.shown.startsWith('"')
                  ? "A text answer was given instead of a numerical percentage."
                  : "A percentage above 100 is outside the valid range for a test score."}
              </span>
            </li>
          ))}
        </ul>
        <p className="small-note">
          Rule used: a response is valid if the test score is a number between 0 and 100.
          {lowScores.length > 0 && (
            <> Very low scores ({lowScores.map((s) => `${s}%`).join(", ")}) are unusual but valid numbers
            in that range, so they were kept.</>
          )}
        </p>
      </Reveal>
    </div>
  );
}
