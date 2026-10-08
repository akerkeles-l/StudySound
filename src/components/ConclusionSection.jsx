import { Section } from "./ui";
import Conclusion from "./Conclusion";
import Limitations from "./Limitations";
import SurveyCTA from "./SurveyCTA";

export default function ConclusionSection({ a }) {
  return (
    <Section
      id="conclusion"
      step="07 · What can we conclude?"
      title="Conclusion"
      tone="alt"
    >
      <div className="stack">
        <Conclusion a={a} />
        <Limitations />
        <SurveyCTA />
      </div>
    </Section>
  );
}
