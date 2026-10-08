import { useMemo } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";
import { Reveal, ChartFrame } from "./ui";
import { prefersReducedMotion } from "../hooks/hooks";
import { COLORS, axisProps } from "./charts";
import { fmt } from "../format";

function ScatterTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="tooltip">
      <span>Music hours: <strong>{d.x} h</strong></span>
      <span>Test score: <strong>{d.y}%</strong></span>
      <span>{d.n} {d.n === 1 ? "student" : "students"} with this answer</span>
    </div>
  );
}

export default function ScatterPlot({ a }) {
  // Many students gave identical answers (same hours AND same score).
  // Identical points are drawn as one dot whose size shows how many students it represents,
  // so all valid observations are still shown (the counts add up to n).
  const points = useMemo(() => {
    const map = new Map();
    a.valid.forEach(({ musicHours: x, testScore: y }) => {
      const key = `${x}|${y}`;
      map.set(key, { x, y, n: (map.get(key)?.n || 0) + 1 });
    });
    return [...map.values()];
  }, [a.valid]);

  const { slope, intercept } = a.regression;
  const xs = a.valid.map((d) => d.musicHours);
  const x0 = Math.min(...xs), x1 = Math.max(...xs);

  return (
    <Reveal className="card scatter-card">
      <h3>Music Listening vs. Test Performance</h3>
      <div className="scatter-wrap">
        <div className="annotation" aria-label={`r equals ${fmt(a.correlation.r, 3)}, p equals ${fmt(a.test.p, 3)}`}>
          <span>r = {fmt(a.correlation.r, 3)}</span>
          <span>p = {fmt(a.test.p, 3)}</span>
        </div>
        <ChartFrame
          height={420}
          label={`Scatter plot of ${a.n} students: music hours per day on the x axis, test score on the y axis, with a slightly downward regression line.`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 16, right: 16, bottom: 34, left: 4 }}>
              <CartesianGrid stroke={COLORS.grid} />
              <XAxis type="number" dataKey="x" name="Music hours" domain={[-0.25, 2.25]} ticks={[0, 0.5, 1, 1.5, 2]} allowDataOverflow {...axisProps}
                label={{ value: "Music listening (hours/day)", position: "insideBottom", offset: -20, fill: COLORS.axis, fontSize: 12 }} />
              <YAxis type="number" dataKey="y" name="Test score" domain={[0, 105]} ticks={[0, 20, 40, 60, 80, 100]} allowDataOverflow {...axisProps} width={40}
                label={{ value: "Test score (%)", angle: -90, position: "insideLeft", offset: 6, fill: COLORS.axis, fontSize: 12, style: { textAnchor: "middle" } }} />
              <ZAxis type="number" dataKey="n" range={[70, 330]} domain={[1, 6]} />
              <Tooltip cursor={{ strokeDasharray: "4 4", stroke: COLORS.axis }} content={<ScatterTooltip />} />
              <ReferenceLine
                segment={[{ x: x0, y: intercept + slope * x0 }, { x: x1, y: intercept + slope * x1 }]}
                stroke={COLORS.accent} strokeWidth={3} ifOverflow="visible" isFront
              />
              <Scatter data={points} fill={COLORS.lavender} fillOpacity={0.8} stroke="#0e0f13" strokeWidth={1.5}
                isAnimationActive={!prefersReducedMotion()} animationDuration={900} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartFrame>
      </div>

      <ul className="legend">
        <li><i className="dot" aria-hidden="true" /> One dot = one answer combination (bigger dot = more students, total {a.n})</li>
        <li><i className="line" aria-hidden="true" /> Regression line: Score = {fmt(intercept)} {slope < 0 ? "−" : "+"} {fmt(Math.abs(slope))} × Music Hours</li>
      </ul>
    </Reveal>
  );
}
