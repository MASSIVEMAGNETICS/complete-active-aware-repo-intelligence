import { Link, NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="topbar">
      <Link to="/" className="brand-lockup" style={{ textDecoration: "none" }}>
        <div className="brand-kicker">Massive Magnetics</div>
        <div className="brand-title">Launch Console</div>
      </Link>
      <nav className="topnav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "topnav-active" : ""}>
          Home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? "topnav-active" : ""}>
          All Projects
        </NavLink>
        <a
          href="https://github.com/MASSIVEMAGNETICS"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
