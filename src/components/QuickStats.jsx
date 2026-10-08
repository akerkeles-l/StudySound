import { useInView, useCountUp } from "../hooks/hooks";
import { Reveal, IconInbox, IconCheck, IconClock, IconTarget } from "./ui";

function StatCard({ icon, value, decimals = 0, suffix = "", label, started, delay }) {
  const shown = useCountUp(value, started);
  return (
    <Reveal className="stat-card" delay={delay}>
      <span className="stat-icon">{icon}</span>
      <p className="stat-value" aria-label={`${value.toFixed(decimals)}${suffix}`}>
        <span aria-hidden="true">{shown.toFixed(decimals)}{suffix}</span>
      </p>
      <p className="stat-label">{label}</p>
    </Reveal>
  );
}

export default function QuickStats({ a }) {
  const [ref, seen] = useInView(0.3);
  return (
    <section className="quick" aria-label="Key numbers">
      <div className="container quick-grid" ref={ref}>
        <StatCard icon={<IconInbox />} value={a.rawCount} label="Raw responses" started={seen} delay={0} />
        <StatCard icon={<IconCheck />} value={a.n} label="Valid observations" started={seen} delay={80} />
        <StatCard icon={<IconClock />} value={a.hoursStats.mean} decimals={2} suffix=" h" label="Average music listening" started={seen} delay={160} />
        <StatCard icon={<IconTarget />} value={a.scoreStats.mean} decimals={2} suffix="%" label="Average test score" started={seen} delay={240} />
      </div>
    </section>
  );
}
