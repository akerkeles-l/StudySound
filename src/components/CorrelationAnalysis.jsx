import { Reveal } from "./ui";
import { fmt } from "../format";

export default function CorrelationAnalysis({ a }) {
  const { r, label } = a.correlation;
  const { p, alpha, significant } = a.test;
  const pos = ((r + 1) / 2) * 100; // position of r on the -1 … +1 scale

  return (
    <div className="block">
      <Reveal className="card feature">
        <p className="eyebrow">Pearson correlation</p>
        <p className="big-number">r = {fmt(r, 3)}</p>
        <p><span className="badge">{label}</span></p>

        <div className="scale" role="img" aria-label={`r = ${fmt(r, 3)} on a scale from −1 to +1`}>
          <div className="scale-track"><span className="scale-mid" /><span className="scale-marker" style={{ left: `${pos}%` }} /></div>
          <div className="scale-labels"><span>−1<br />perfect negative</span><span>0<br />no linear relation</span><span>+1<br />perfect positive</span></div>
        </div>

        <p className="prose">
          The Pearson correlation coefficient measures the strength and direction of a linear
          relationship. In this sample, the correlation is weak and {r < 0 ? "negative" : "positive"}.
        </p>

        <div className="p-row">
          <span className="p-val">p = {fmt(p, 3)}</span>
          <span>
            {significant
              ? `Because p < ${alpha}, the observed correlation is statistically significant at the 5% significance level.`
              : `Because p > ${alpha}, the observed correlation is not statistically significant at the 5% significance level.`}
          </span>
        </div>
      </Reveal>
    </div>
  );
}
