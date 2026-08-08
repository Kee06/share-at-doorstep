import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Share at Doorstep</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
<a href="http://localhost:5000/pickup.html" className="navbar-cta">Book a Pickup</a>      </div>
    </nav>
  );
}

export default Navbar;