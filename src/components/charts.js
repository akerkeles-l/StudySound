// Chart colours (SVG attributes cannot use CSS variables, so they live here).
export const COLORS = {
  lavender: "#a99cf5",
  blue: "#7ea6f0",
  accent: "#f4b860",
  grid: "rgba(255,255,255,0.08)",
  axis: "#a8a7ba",
  text: "#ecebf3",
};

export const axisProps = {
  stroke: COLORS.axis,
  tick: { fill: COLORS.axis, fontSize: 12 },
  tickLine: false,
};
