# StudySound — Mathematical Statistics Project
React + Vite + Recharts. All statistics are computed in code from the raw data.

    npm install
    npm run dev       # local development
    npm run check     # compares calculations with the verified values
    npm run build     # production build in dist/

Edit `src/config.js` to set `GOOGLE_FORM_URL`. Raw data: `src/data/rawResponses.js`.
Validation: `src/stats/validate.js`. Formulas: `src/stats/stats.js`.
Deploy: push to GitHub, import the repo in Vercel (Framework: Vite) -> Deploy.
