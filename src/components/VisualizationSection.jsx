import { Section } from "./ui";
import DistributionCharts from "./DistributionCharts";
import ScatterPlot from "./ScatterPlot";

export default function VisualizationSection({ a }) {
  return (
    <Section
      id="visualization"
      step="04 · Pictures of the data"
      title="Distributions and scatter plot"
      intro="First each variable on its own, then both together: does a higher x go with a higher or lower y?"
      tone="alt"
    >
      <DistributionCharts a={a} />
      <div className="spacer" />
      <ScatterPlot a={a} />
    </Section>
  );
}
