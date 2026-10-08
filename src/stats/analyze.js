import { ALPHA } from "../config.js";
import { validateResponses } from "./validate.js";
import {
  describe, pearson, linearRegression, correlationTest,
  valueCounts, binScores, describeCorrelation,
} from "./stats.js";

/** Runs the whole analysis: validation -> descriptive -> correlation -> test -> regression. */
export function analyze(raw) {
  const { rawCount, valid, excluded } = validateResponses(raw);

  const hours = valid.map((d) => d.musicHours);
  const scores = valid.map((d) => d.testScore);

  const r = pearson(hours, scores);
  const test = correlationTest(r, valid.length);
  const reg = linearRegression(hours, scores);

  return {
    rawCount,
    valid,
    excluded,
    n: valid.length,
    hoursStats: describe(hours),
    scoreStats: describe(scores),
    correlation: { r, ...describeCorrelation(r) },
    test: { ...test, alpha: ALPHA, significant: test.p < ALPHA },
    regression: reg,
    hoursCounts: valueCounts(hours),
    scoreBins: binScores(scores),
  };
}
