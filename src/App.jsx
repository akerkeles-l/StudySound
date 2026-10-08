import { useEffect, useMemo, useState } from "react";
import { loadRawResponses } from "./data/dataSource";
import { analyze } from "./stats/analyze";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickStats from "./components/QuickStats";
import ResearchQuestion from "./components/ResearchQuestion";
import DataSection from "./components/DataSection";
import DescriptiveStatistics from "./components/DescriptiveStatistics";
import VisualizationSection from "./components/VisualizationSection";
import AnalysisSection from "./components/AnalysisSection";
import CalculatorLab from "./components/CalculatorLab";
import ConclusionSection from "./components/ConclusionSection";
import Footer from "./components/Footer";

export default function App() {
  const [raw, setRaw] = useState(null);
  const [error, setError] = useState(null);

  // 1) load raw data (static file now, could be Google Sheets later)
  useEffect(() => {
    loadRawResponses().then(setRaw).catch((e) => setError(e.message));
  }, []);

  // 2) validate + calculate every statistic from the raw data
  const analysis = useMemo(() => (raw ? analyze(raw) : null), [raw]);

  if (error) return <main className="container status"><p role="alert">Could not load the data: {error}</p></main>;
  if (!analysis) return <main className="container status"><p role="status">Loading data…</p></main>;

  return (
    <>
      <a className="skip-link" href="#research">Skip to content</a>
      <Navbar />
      <main>
        <Hero rawCount={analysis.rawCount} />
        <QuickStats a={analysis} />
        <ResearchQuestion />
        <DataSection a={analysis} />
        <DescriptiveStatistics a={analysis} />
        <VisualizationSection a={analysis} />
        <AnalysisSection a={analysis} />
        <CalculatorLab a={analysis} />
        <ConclusionSection a={analysis} />
      </main>
      <Footer />
    </>
  );
}
