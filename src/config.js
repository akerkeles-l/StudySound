// ─────────────────────────────────────────────────────────────
//  Project configuration - the only file you need to edit.
// ─────────────────────────────────────────────────────────────

// 1) Put your public Google Form link here (e.g. "https://forms.gle/....").
//    Every "Take the survey" button on the site uses this single constant.
export const GOOGLE_FORM_URL = "YOUR_GOOGLE_FORM_URL";

// 2) Where the data comes from.
//    "static" -> src/data/rawResponses.js (used now, no backend needed)
//    "sheets" -> reserved for a future Google Sheets / API source
//               (see src/data/dataSource.js)
export const DATA_SOURCE = "static";

// 3) Significance level used in the hypothesis test.
export const ALPHA = 0.05;

// True while the placeholder has not been replaced yet.
export const FORM_URL_IS_PLACEHOLDER = GOOGLE_FORM_URL === "YOUR_GOOGLE_FORM_URL";
