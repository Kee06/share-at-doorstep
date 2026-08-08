import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Let's Spread Happiness</h1>
        <p>We Deliver your Donations to the Right Place</p>
        <a href="http://localhost:5000/" className="hero-btn">Book a Pickup</a>
      </div>
    </section>
  );
}

export default Hero;