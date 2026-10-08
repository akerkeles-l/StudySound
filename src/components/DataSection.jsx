import { Section } from "./ui";
import DataCollection from "./DataCollection";
import DataQuality from "./DataQuality";

export default function DataSection({ a }) {
  return (
    <Section
      id="data"
      step="02 · The data"
      title="Where the numbers come from"
      intro="Two variables per student, one anonymous Google Form, and a validation step before any calculation."
      tone="alt"
    >
      <div className="two-col">
        <DataCollection rawCount={a.rawCount} />
        <DataQuality a={a} />
      </div>
    </Section>
  );
}
