import { Reveal } from "./ui";
import { fmt } from "../format";

export default function RegressionAnalysis({ a }) {
  const { slope, intercept, r2 } = a.regression;
  const down = slope < 0;

  return (
    <div className="block">
      <Reveal className="card feature">
        <p className="eyebrow">Simple linear regression</p>
        <p className="equation">
          Score = {fmt(intercept)} {down ? "−" : "+"} {fmt(Math.abs(slope))} × Music Hours
        </p>
        <p className="small-note">Model: Score = a + b × Music Hours (least squares, n = {a.n})</p>

        <p className="prose">
          The fitted model estimates {down ? "a decrease" : "an increase"} of about {fmt(Math.abs(slope))} percentage
          points in predicted score for each additional hour of music listening.{" "}
          {a.test.significant
            ? "Even so, this is an association in observational data, not proof of cause and effect."
            : "However, the relationship is weak and not statistically significant, so this slope should not be interpreted as evidence that music causes lower scores."}
        </p>

        <div className="r2">
          <div className="r2-head"><span className="p-val">R² = {fmt(r2, 3)}</span></div>
          <div className="r2-bar" role="img" aria-label={`${fmt(r2 * 100, 1)} percent of variation explained`}>
            <span style={{ width: `${Math.max(r2 * 100, 0.8)}%` }} />
          </div>
          <div className="scale-labels"><span>0% explained</span><span>100%</span></div>
          <p className="prose">
            Only about {fmt(r2 * 100, 1)}% of the variation in test scores is explained by this simple linear model.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
