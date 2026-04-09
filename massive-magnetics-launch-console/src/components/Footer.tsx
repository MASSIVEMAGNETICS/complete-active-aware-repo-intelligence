import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-kicker">Massive Magnetics</span>
          <span className="footer-tagline">
            Building systems people can actually understand.
          </span>
        </div>
        <nav className="footer-nav">
          <a
            href="https://github.com/MASSIVEMAGNETICS"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <Link to="/">Home</Link>
          <Link to="/projects">All Projects</Link>
        </nav>
      </div>
    </footer>
  );
}
