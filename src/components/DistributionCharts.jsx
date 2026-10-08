import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Reveal, ChartFrame } from "./ui";
import { prefersReducedMotion } from "../hooks/hooks";
import { COLORS, axisProps } from "./charts";

function HistTooltip({ active, payload, unit }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="tooltip">
      <strong>{d.label}{unit}</strong>
      <span>{d.count} {d.count === 1 ? "student" : "students"}</span>
    </div>
  );
}

function Histogram({ title, data, color, xLabel, unit, summary }) {
  return (
    <Reveal className="card chart-card">
      <h3>{title}</h3>
      <ChartFrame height={300} label={summary}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 28, left: 0 }} barCategoryGap={data.length > 6 ? 3 : "18%"}>
            <CartesianGrid vertical={false} stroke={COLORS.grid} />
            <XAxis dataKey="label" {...axisProps} label={{ value: xLabel, position: "insideBottom", offset: -18, fill: COLORS.axis, fontSize: 12 }} />
            <YAxis allowDecimals={false} {...axisProps} width={34} label={{ value: "Number of students", angle: -90, position: "insideLeft", offset: 12, fill: COLORS.axis, fontSize: 12, style: { textAnchor: "middle" } }} />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} content={<HistTooltip unit={unit} />} />
            <Bar dataKey="count" fill={color} radius={[6, 6, 0, 0]} isAnimationActive={!prefersReducedMotion()} animationDuration={900} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
      <details className="precise">
        <summary>Show values as a list</summary>
        <ul>
          {data.map((d) => <li key={d.label}><span>{d.label}{unit}</span><code>{d.count}</code></li>)}
        </ul>
      </details>
    </Reveal>
  );
}

export default function DistributionCharts({ a }) {
  const hoursData = a.hoursCounts.map(({ value, count }) => ({ label: String(value), count }));
  return (
    <div className="two-col">
      <Histogram
        title="Distribution of Music Listening Time"
        data={hoursData}
        color={COLORS.lavender}
        xLabel="Hours of music while studying"
        unit=" h"
        summary="Bar chart: number of students for each reported amount of daily music hours while studying."
      />
      <Histogram
        title="Distribution of Test Scores"
        data={a.scoreBins}
        color={COLORS.blue}
        xLabel="Test score (%)"
        unit="%"
        summary="Histogram of test scores in bins of 10 percentage points."
      />
    </div>
  );
}
