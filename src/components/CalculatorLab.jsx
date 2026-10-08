import { useState } from "react";
import { Reveal, Section } from "./ui";
import { parseNum, combinatorics, basicProbability, bayes, poisson, predictScore } from "../stats/calculators";

function Calculator({ title, desc, formula, fields, compute, delay = 0 }) {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.key, f.def])));
  const [result, setResult] = useState(null);

  const run = (e) => {
    e.preventDefault();
    const nums = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, parseNum(v)]));
    if (Object.values(nums).some(Number.isNaN)) return setResult({ error: "Please fill in every field with a number." });
    setResult(compute(nums));
  };

  return (
    <Reveal className="card calc" delay={delay}>
      <h3>{title}</h3>
      <p className="small-note">{desc}</p>
      <p className="calc-formula"><code>{formula}</code></p>
      <form onSubmit={run} noValidate>
        <div className="calc-fields">
          {fields.map((f) => (
            <label key={f.key}>
              <span>{f.label}</span>
              <input
                type="text" inputMode="decimal" value={values[f.key]}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              />
            </label>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Calculate</button>
      </form>
      <div className={`calc-result ${result?.error ? "err" : ""}`} role="status" aria-live="polite">
        {!result && <p className="small-note">Enter values and click Calculate to see the result.</p>}
        {result?.error && <p>{result.error}</p>}
        {result?.main && (
          <>
            <p className="calc-main">{result.main}</p>
            <ul>{result.steps.map((s) => <li key={s}>{s}</li>)}</ul>
          </>
        )}
      </div>
    </Reveal>
  );
}

export default function CalculatorLab({ a }) {
  const xs = a.valid.map((d) => d.musicHours);
  const model = { ...a.regression, minX: Math.min(...xs), maxX: Math.max(...xs) };

  return (
    <Section
      id="calculators"
      step="06 · Try it yourself"
      title="Probability & Calculator Lab"
      intro="Change an input, press Calculate. Decimals can be written with a dot or a comma."
    >
      <div className="two-col">
        <Calculator title="Predict a score (this study's model)" desc="Uses the regression line fitted to the 38 valid observations."
          formula={`Score = ${a.regression.intercept.toFixed(2)} ${a.regression.slope < 0 ? "−" : "+"} ${Math.abs(a.regression.slope).toFixed(2)} × Hours`}
          fields={[{ key: "hours", label: "Music hours per day", def: "1" }]}
          compute={(v) => predictScore(v, model)} />
        <Calculator title="Combinatorics" desc="Permutations, arrangements and combinations with the steps shown."
          formula="Pₙ = n!  |  A(n,k) = n!/(n−k)!  |  C(n,k) = n!/(k!(n−k)!)"
          fields={[{ key: "n", label: "n (total elements)", def: "4" }, { key: "k", label: "k (subset size)", def: "3" }]}
          compute={combinatorics} delay={80} />
        <Calculator title="Basic probability" desc="Probability of an event from favorable and total outcomes."
          formula="P(A) = Favorable outcomes / Total outcomes"
          fields={[{ key: "fav", label: "Favorable outcomes", def: "3" }, { key: "total", label: "Total outcomes", def: "10" }]}
          compute={basicProbability} />
        <Calculator title="Bayes' theorem" desc="Conditional probability from a prior and evidence."
          formula="P(A|B) = [P(B|A) × P(A)] / P(B)"
          fields={[{ key: "pA", label: "P(A) (prior)", def: "0.01" }, { key: "pBA", label: "P(B|A) (sensitivity)", def: "0.95" }, { key: "pB", label: "P(B) (total evidence)", def: "0.05" }]}
          compute={(v) => bayes({ pA: v.pA, pBA: v.pBA, pB: v.pB })} delay={80} />
        <Calculator title="Poisson distribution" desc="Probability of exactly k events when the average rate is λ."
          formula="P(X = k) = (λ^k × e^(−λ)) / k!"
          fields={[{ key: "lambda", label: "λ (rate)", def: "3" }, { key: "k", label: "k (number of events)", def: "2" }]}
          compute={poisson} />
      </div>
    </Section>
  );
}
