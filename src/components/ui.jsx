import { useState } from "react";
import { GOOGLE_FORM_URL, FORM_URL_IS_PLACEHOLDER } from "../config";
import { useInView } from "../hooks/hooks";

/* ── Icons (tiny inline SVGs, decorative) ───────────────── */
const svgProps = {
  width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round",
  "aria-hidden": true, focusable: "false",
};
export const IconHeadphones = (p) => (
  <svg {...svgProps} {...p}><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="4" height="7" rx="1.5" /><rect x="17" y="14" width="4" height="7" rx="1.5" /></svg>
);
export const IconInbox = (p) => (
  <svg {...svgProps} {...p}><path d="M3 13l3-8h12l3 8" /><path d="M3 13v6h18v-6h-5a4 4 0 0 1-8 0H3z" /></svg>
);
export const IconCheck = (p) => (
  <svg {...svgProps} {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.7 2.7L16.5 9.5" /></svg>
);
export const IconClock = (p) => (
  <svg {...svgProps} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconTarget = (p) => (
  <svg {...svgProps} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
);
export const IconNote = (p) => (
  <svg {...svgProps} {...p}><path d="M9 18V5l11-2v13" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></svg>
);

/* ── Decorative waveform ────────────────────────────────── */
export function Waveform({ bars = 48, className = "" }) {
  // Deterministic "random" heights, so the picture is the same on every render.
  const heights = Array.from({ length: bars }, (_, i) =>
    18 + 82 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21 + 1.3))
  );
  return (
    <div className={`waveform ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span key={i} style={{ height: `${h}%`, animationDelay: `${(i % 12) * 0.12}s` }} />
      ))}
    </div>
  );
}

/* ── Fade-in on scroll ──────────────────────────────────── */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, seen] = useInView(0.12);
  return (
    <Tag ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ── Section wrapper with a small label + title ─────────── */
export function Section({ id, step, title, intro, children, tone = "" }) {
  return (
    <section id={id} className={`section ${tone}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <Reveal>
          <header className="section-head">
            {step && <p className="eyebrow">{step}</p>}
            <h2 id={`${id}-title`}>{title}</h2>
            {intro && <p className="lead">{intro}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ── Survey button – every survey link uses GOOGLE_FORM_URL ── */
export function SurveyButton({ children = "Take the survey", variant = "primary" }) {
  const [hint, setHint] = useState(false);

  if (FORM_URL_IS_PLACEHOLDER) {
    // Placeholder not replaced yet: do not navigate to a broken link.
    return (
      <span className="survey-wrap">
        <button type="button" className={`btn btn-${variant}`} data-form-url={GOOGLE_FORM_URL} onClick={() => setHint(true)}>
          {children}
        </button>
        {hint && (
          <span className="survey-hint" role="status">
            Placeholder: set <code>GOOGLE_FORM_URL</code> in <code>src/config.js</code>
          </span>
        )}
      </span>
    );
  }
  return (
    <a className={`btn btn-${variant}`} href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/* ── Chart that only mounts when scrolled into view (so it animates on first view) ── */
export function ChartFrame({ children, height = 320, label }) {
  const [ref, seen] = useInView(0.25);
  return (
    <div ref={ref} className="chart-frame" style={{ height }} role="img" aria-label={label}>
      {seen ? children : null}
    </div>
  );
}
