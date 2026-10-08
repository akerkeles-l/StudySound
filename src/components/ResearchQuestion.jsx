import { Reveal, Section } from "./ui";

export default function ResearchQuestion() {
  return (
    <Section id="research" step="01 · The question" title="Why this study?">
      <Reveal>
        <p className="prose">
          Many students listen to music while studying. Some find it helps concentration, while
          others believe it can be distracting. This project explores whether the amount of time
          students spend listening to music while studying is statistically related to their
          recent test performance.
        </p>
      </Reveal>

      <Reveal className="question-card" delay={100}>
        <p className="eyebrow">Research question</p>
        <blockquote>
          Is there a statistical relationship between the amount of time students listen to music
          while studying and their test performance?
        </blockquote>

        <div className="var-grid">
          <div className="var">
            <span className="var-tag">X · explanatory</span>
            <strong>Music listening time</strong>
            <span>hours per day while studying</span>
          </div>
          <div className="var-arrow" aria-hidden="true">→</div>
          <div className="var">
            <span className="var-tag">Y · response</span>
            <strong>Most recent test score</strong>
            <span>percentage (%)</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <p className="callout">
          <strong>Association, not causation.</strong> The analysis investigates whether there is a
          statistical relationship between the two variables. Correlation does not prove
          causation, and other factors may influence test performance.
        </p>
      </Reveal>
    </Section>
  );
}
