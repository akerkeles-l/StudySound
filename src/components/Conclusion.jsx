import { Reveal } from "./ui";
import { fmt } from "../format";

export default function Conclusion({ a }) {
  const { r, strength, direction } = a.correlation;
  const { p, alpha, significant } = a.test;

  return (
    <div className="block">
      <Reveal className="conclusion">
        <p className="eyebrow">Conclusion</p>
        <p className="conclusion-main">
          Based on the {a.n} valid observations, the data show a {strength.toLowerCase()} {direction} linear
          correlation between time spent listening to music while studying and test performance (r = {fmt(r, 3)}).{" "}
          {significant
            ? `The relationship is statistically significant (p = ${fmt(p, 3)} < ${alpha}), so this sample provides evidence of a linear association.`
            : `However, the relationship is not statistically significant (p = ${fmt(p, 3)} > ${alpha}). Therefore, this sample does not provide sufficient evidence of a linear relationship between the two variables.`}
        </p>
        <p>
          {significant
            ? "This is an association only; it does not show that music changes academic performance."
            : "This result does not prove that music has no effect on academic performance. It only means that this dataset does not provide sufficient evidence of a statistically significant linear association."}
        </p>
        <p>
          Other factors, such as study time, type of music, concentration, sleep, difficulty of the
          test, and individual study habits, could influence test performance. They were not measured here.
        </p>
      </Reveal>
    </div>
  );
}
