// RAW survey export (Google Form -> Excel), 40 responses.
// Only the two analytical variables are kept. Timestamps were dropped on purpose (privacy).
//
// Values are stored EXACTLY as submitted. Two responses are problematic
// (testScore 111 and "Not bad") - they are NOT edited or deleted here;
// they are filtered out later by src/stats/validate.js and reported openly.
//
// musicHours = "On average, how many hours per day do you listen to music while studying?"
// testScore  = "What was your most recent test score, as a percentage?"
export const rawResponses = [
  { musicHours: 0, testScore: 90 },
  { musicHours: 2, testScore: 70 },
  { musicHours: 1.5, testScore: 90 },
  { musicHours: 1, testScore: 1 },
  { musicHours: 1.5, testScore: 85 },
  { musicHours: 0, testScore: 50 },
  { musicHours: 2, testScore: 70 },
  { musicHours: 2, testScore: 80 },
  { musicHours: 1, testScore: 75 },
  { musicHours: 0.5, testScore: 60 },
  { musicHours: 2, testScore: 50 },
  { musicHours: 1.5, testScore: 60 },
  { musicHours: 0.5, testScore: 80 },
  { musicHours: 1, testScore: 55 },
  { musicHours: 2, testScore: 95 },
  { musicHours: 1, testScore: 75 },
  { musicHours: 1, testScore: 82 },
  { musicHours: 1, testScore: 111 },
  { musicHours: 1.5, testScore: 75 },
  { musicHours: 0.5, testScore: 77 },
  { musicHours: 1.5, testScore: 2 },
  { musicHours: 0, testScore: 90 },
  { musicHours: 0, testScore: 90 },
  { musicHours: 2, testScore: 71 },
  { musicHours: 1.5, testScore: 80 },
  { musicHours: 1.5, testScore: 60 },
  { musicHours: 2, testScore: 60 },
  { musicHours: 0.5, testScore: 70 },
  { musicHours: 0, testScore: 90 },
  { musicHours: 1, testScore: 80 },
  { musicHours: 0.5, testScore: 75 },
  { musicHours: 1.5, testScore: 80 },
  { musicHours: 0.5, testScore: 85 },
  { musicHours: 2, testScore: 65 },
  { musicHours: 1.5, testScore: 67 },
  { musicHours: 1.5, testScore: "Not bad" },
  { musicHours: 2, testScore: 100 },
  { musicHours: 1, testScore: 80 },
  { musicHours: 2, testScore: 90 },
  { musicHours: 0, testScore: 90 },
];
