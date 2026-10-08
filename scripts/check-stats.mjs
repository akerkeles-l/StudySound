// Run with:  npm run check
// Compares the code's calculations with the verified values from the project brief.
import { rawResponses } from "../src/data/rawResponses.js";
import { analyze } from "../src/stats/analyze.js";

const a = analyze(rawResponses);
const expected = [
  ["raw responses", a.rawCount, 40, 0],
  ["valid observations", a.n, 38, 0],
  ["excluded", a.excluded.length, 2, 0],
  ["hours mean", a.hoursStats.mean, 1.1447, 5e-5],
  ["hours median", a.hoursStats.median, 1.25, 0],
  ["hours min", a.hoursStats.min, 0, 0],
  ["hours max", a.hoursStats.max, 2, 0],
  ["hours sd", a.hoursStats.sd, 0.7157, 5e-5],
  ["score mean", a.scoreStats.mean, 72.2368, 5e-5],
  ["score median", a.scoreStats.median, 76, 0],
  ["score min", a.scoreStats.min, 1, 0],
  ["score max", a.scoreStats.max, 100, 0],
  ["score sd", a.scoreStats.sd, 21.0038, 5e-5],
  ["Pearson r", a.correlation.r, -0.1264, 5e-5],
  ["p-value", a.test.p, 0.4496, 5e-5],
  ["slope b", a.regression.slope, -3.7091, 5e-5],
  ["intercept a", a.regression.intercept, 76.4828, 5e-5],
  ["R²", a.regression.r2, 0.01598, 5e-6],
];
let bad = 0;
for (const [name, got, want, tol] of expected) {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) bad++;
  console.log(`${ok ? "OK  " : "FAIL"} ${name.padEnd(20)} got ${got}  expected ${want}`);
}
console.log("t =", a.test.t, "df =", a.test.df);
console.log("excluded:", a.excluded.map((e) => e.reason));
console.log("hours counts:", JSON.stringify(a.hoursCounts));
console.log("score bins:", a.scoreBins.map((b) => `${b.label}:${b.count}`).join("  "));
process.exit(bad ? 1 : 0);
