import { IconHeadphones, SurveyButton, Waveform } from "./ui";

export default function Hero({ rawCount }) {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <Waveform bars={64} className="hero-wave" />
      <div className="container hero-inner">
        <p className="hero-brand">
          <IconHeadphones width={18} height={18} /> StudySound · Music, Focus &amp; Test Performance
        </p>
        <h1 id="hero-title">Does Music Help You&nbsp;Study?</h1>
        <p className="hero-sub">
          The Relationship Between Listening to Music While Studying and Test Performance
        </p>
        <p className="hero-note">
          An exploratory statistical analysis based on {rawCount} student responses.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#statistics">Explore the Results</a>
          <SurveyButton variant="ghost">Take the Survey</SurveyButton>
        </div>
      </div>
    </section>
  );
}
