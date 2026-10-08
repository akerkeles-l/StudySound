import { Reveal } from "./ui";
import { fmt } from "../format";

export default function HypothesisTest({ a }) {
  const { p, alpha, significant, t, df } = a.test;
  const pPos = Math.min(p, 1) * 100;

  return (
    <div className="block">
      <Reveal className="paper">
        <h3>Hypothesis test for the correlation</h3>
        <div className="hyp-grid">
          <div>
            <p className="hyp-label">Null hypothesis</p>
            <p className="hyp-formula">H₀: ρ = 0</p>
            <p>There is no linear population correlation between music listening time and test performance.</p>
          </div>
          <div>
            <p className="hyp-label">Alternative hypothesis</p>
            <p className="hyp-formula">H₁: ρ ≠ 0</p>
            <p>There is a linear population correlation.</p>
          </div>
        </div>

        <dl className="hyp-facts">
          <div><dt>Significance level</dt><dd>α = {alpha}</dd></div>
          <div><dt>Test statistic</dt><dd>t = {fmt(t, 3)} (df = {df})</dd></div>
          <div><dt>Result</dt><dd>p = {fmt(p, 3)}</dd></div>
          <div className="decision"><dt>Decision</dt><dd>{significant ? "Reject H₀" : "Fail to reject H₀"}</dd></div>
        </dl>

        <div className="pscale" role="img" aria-label={`p-value ${fmt(p, 3)} compared with alpha ${alpha}`}>
          <div className="pscale-track">
            <span className="pscale-zone" style={{ width: `${alpha * 100}%` }} />
            <span className="pscale-alpha" style={{ left: `${alpha * 100}%` }} />
            <span className="pscale-p" style={{ left: `${pPos}%` }} />
          </div>
          <div className="pscale-labels">
            <span>0</span>
            <span style={{ left: `${alpha * 100}%` }} className="at">α = {alpha}</span>
            <span style={{ left: `${pPos}%` }} className="at strong">p = {fmt(p, 3)}</span>
            <span className="end">1</span>
          </div>
          <p className="small-note">The p-value is {significant ? "inside" : "outside"} the small zone (p &lt; α) where H₀ would be rejected.</p>
        </div>

        <p className="prose">
          <strong>In plain words:</strong>{" "}
          {significant
            ? "If there were really no linear relationship, a correlation this strong would be unlikely in a sample like this. So the sample does provide evidence of a linear relationship."
            : `If there were really no linear relationship, a correlation of this size would still appear fairly often just by chance (about ${Math.round(p * 100)} times in 100 samples). So the sample does not provide sufficient statistical evidence of a linear relationship between listening to music while studying and test performance.`}
        </p>
        {!significant && (
          <p className="small-note">
            “Fail to reject H₀” does not mean H₀ is proven true, and it does not prove that there is no relationship.
          </p>
        )}
      </Reveal>
    </div>
  );
}
