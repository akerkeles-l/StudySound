import { IconHeadphones } from "./ui";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-title"><IconHeadphones width={18} height={18} /> StudySound — Mathematical Statistics Project</p>
        <p>An exploratory analysis of the relationship between music listening while studying and test performance.</p>
      </div>
    </footer>
  );
}
