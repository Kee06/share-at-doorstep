import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Turn Your Unused Items Into Someone's Smile</h1>
        <p>We pick up your donations from your doorstep and deliver them straight to verified NGOs.</p>
<a href="http://localhost:5000/pickup.html" className="hero-btn">Book a Pickup →</a>      </div>
    </section>
  );
}

export default Hero;