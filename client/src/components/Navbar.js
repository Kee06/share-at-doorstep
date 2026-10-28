import { Link } from "react-router-dom";
import "./Navbar.css";

function NavDropdown({ label, links }) {
  return (
    <div className="nav-dropdown">
      <span className="nav-dropdown-label">{label}</span>
      <div className="nav-dropdown-menu">
        {links.map((l) => (
          <Link key={l.to} to={l.to}>{l.text}</Link>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Share at Doorstep</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        <NavDropdown
          label="Get Involved"
          links={[
            { to: "/ngo-partner", text: "Become an NGO Partner" },
            { to: "/volunteer", text: "Volunteer" },
          ]}
        />

        <NavDropdown
          label="About Us"
          links={[
            { to: "/our-story", text: "Our Story" },
            { to: "/how-we-work", text: "How We Work" },
          ]}
        />

        <NavDropdown
          label="Contact Us"
          links={[
            { to: "/faqs", text: "FAQs" },
            { to: "/contact", text: "Send a Query" },
          ]}
        />

        <Link to="/login">Sign In</Link>
        <a href="http://localhost:5000/pickup.html" className="navbar-cta">Book a Pickup</a>
      </div>
    </nav>
  );
}

export default Navbar;