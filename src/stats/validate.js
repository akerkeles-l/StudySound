/**
 * Data validation - kept separate from the statistics on purpose.
 * Raw values are never modified: a response is either kept as it is
 * or excluded with a written reason.
 *
 * A response is valid when
 *   - musicHours is a finite number, and
 *   - testScore is a finite NUMBER between 0 and 100 (percentage).
 */
export function validateResponses(raw) {
  const valid = [];
  const excluded = [];

  raw.forEach((row, index) => {
    const { musicHours, testScore } = row;

    if (typeof musicHours !== "number" || !Number.isFinite(musicHours)) {
      excluded.push({ index, row, reason: "Music hours is not a number" });
    } else if (typeof testScore !== "number" || !Number.isFinite(testScore)) {
      excluded.push({
        index,
        row,
        reason: `Test score "${String(testScore).trim()}" is not a numerical percentage`,
        shown: `"${String(testScore).trim()}"`,
      });
    } else if (testScore < 0 || testScore > 100) {
      excluded.push({
        index,
        row,
        reason: `Test score ${testScore}% is outside the valid range 0–100%`,
        shown: `${testScore}%`,
      });
    } else {
      valid.push({ musicHours, testScore });
    }
  });

  return { rawCount: raw.length, valid, excluded };
}
