import { Section } from "./ui";
import CorrelationAnalysis from "./CorrelationAnalysis";
import HypothesisTest from "./HypothesisTest";
import RegressionAnalysis from "./RegressionAnalysis";

export default function AnalysisSection({ a }) {
  return (
    <Section
      id="analysis"
      step="05 · Is there a relationship?"
      title="Correlation, hypothesis test and regression"
      intro="How strong is the relationship, could it be just chance, and what line fits the points?"
    >
      <div className="stack">
        <CorrelationAnalysis a={a} />
        <HypothesisTest a={a} />
        <RegressionAnalysis a={a} />
      </div>
    </Section>
  );
}
