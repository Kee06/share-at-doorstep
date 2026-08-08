import "./HowItWorks.css";

const steps = [
  { icon: "📅", title: "Schedule a Pickup", text: "Enter your address and pick a convenient time slot." },
  { icon: "🚚", title: "We Collect It", text: "Our team arrives at your doorstep and picks up the items." },
  { icon: "🎁", title: "It Reaches an NGO", text: "Your donation is delivered directly to a verified NGO partner." },
];

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-grid">
        {steps.map((s, i) => (
          <div className="step-card" key={i}>
            <div className="step-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;