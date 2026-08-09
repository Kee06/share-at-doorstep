import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Share at Doorstep</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        <div className="nav-dropdown">
          <span className="nav-dropdown-label">Get Involved</span>
          <div className="nav-dropdown-menu">
            <Link to="/ngo-partner">Become an NGO Partner</Link>
            <Link to="/volunteer">Volunteer</Link>
          </div>
        </div>

        <div className="nav-dropdown">
          <span className="nav-dropdown-label">About Us</span>
          <div className="nav-dropdown-menu">
            <Link to="/our-story">Our Story</Link>
            <Link to="/how-we-work">How We Work</Link>
          </div>
        </div>

        <div className="nav-dropdown">
          <span className="nav-dropdown-label">Contact Us</span>
          <div className="nav-dropdown-menu">
            <Link to="/faqs">FAQs</Link>
            <Link to="/contact">Send a Query</Link>
          </div>
        </div>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Sign In</Link>
        <a href="http://localhost:5000/pickup.html" className="navbar-cta">Book a Pickup</a>
      </div>
    </nav>
  );
}

export default Navbar;