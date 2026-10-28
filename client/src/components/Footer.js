import { Link } from "react-router-dom";
import "./Footer.css";

const socials = [
  { href: "https://facebook.com", text: "Facebook" },
  { href: "https://twitter.com", text: "Twitter" },
  { href: "https://instagram.com", text: "Instagram" },
];

const pageLinks = [
  { to: "/", text: "Share at Doorstep" },
  { to: "/terms", text: "Terms Of Use" },
  { to: "/privacy", text: "Privacy Policy" },
];

function FooterLink({ to, href, text }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }
  return <Link to={to}>{text}</Link>;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        {socials.map((s) => (
          <FooterLink key={s.text} href={s.href} text={s.text} />
        ))}
      </div>
      <div className="footer-bottom">
        <span>Copyright © 2026</span>
        {pageLinks.map((p) => (
          <FooterLink key={p.to} to={p.to} text={p.text} />
        ))}
      </div>
    </footer>
  );
}

export default Footer;