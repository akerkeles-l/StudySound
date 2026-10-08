import { Reveal, SurveyButton } from "./ui";

export default function DataCollection({ rawCount }) {
  return (
    <div className="block">
      <Reveal>
        <h3>Data collection</h3>
        <ul className="ticks">
          <li>Data were collected using a Google Form.</li>
          <li>{rawCount} responses were received.</li>
          <li>Participation data were analyzed anonymously.</li>
          <li>Only the two relevant variables were used for the main statistical analysis.</li>
          <li>Timestamp data were not used in the analysis (and are not shown on this site).</li>
        </ul>
        <SurveyButton>Take the survey</SurveyButton>
      </Reveal>
    </div>
  );
}
