import { Reveal, SurveyButton, Waveform } from "./ui";

export default function SurveyCTA() {
  return (
    <div className="block">
      <Reveal className="cta">
        <Waveform bars={40} className="cta-wave" />
        <h3>Want to contribute?</h3>
        <p>
          This project can continue growing. If you would like to contribute another anonymous
          response, you can complete the short survey.
        </p>
        <SurveyButton>Take the 2-minute survey →</SurveyButton>
      </Reveal>
    </div>
  );
}
