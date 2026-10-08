import { useState } from "react";
import { useActiveSection } from "../hooks/hooks";
import { IconHeadphones } from "./ui";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "research", label: "Research" },
  { id: "data", label: "Data" },
  { id: "statistics", label: "Statistics" },
  { id: "visualization", label: "Visualization" },
  { id: "analysis", label: "Analysis" },
  { id: "calculators", label: "Calculators" },
  { id: "conclusion", label: "Conclusion" },
];
const IDS = NAV_ITEMS.map((i) => i.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#home" className="brand" aria-label="StudySound – back to top">
          <IconHeadphones width={22} height={22} />
          <span>StudySound</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className={`burger ${open ? "open" : ""}`} aria-hidden="true" />
        </button>

        <nav id="main-nav" className={`nav-links ${open ? "open" : ""}`} aria-label="Main">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
