import "./HowItWorks.css";

const steps = [
  { icon: "📅", title: "Schedule a Pickup", text: "Enter the pickup location and schedule a pickup at your convenience." },
  { icon: "🚚", title: "Donate at your Doorstep", text: "We will come to your doorstep to pick up the donations and deliver them to the NGO." },
  { icon: "🎁", title: "Get Rewards", text: "Get gifts as a gesture of thanks for making a difference." },
];

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>HOW WE WORK</h2>
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