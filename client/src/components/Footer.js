import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <div className="footer-bottom">
        <span>Copyright © 2026</span>
        <Link to="/">Share at Doorstep</Link>
        <Link to="/terms">Terms Of Use</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}

export default Footer;