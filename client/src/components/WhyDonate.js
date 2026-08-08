import "./WhyDonate.css";

const benefits = [
  { icon: "👍", title: "Super Convenient", text: "Schedule a pickup from home and skip the trip to a donation center entirely." },
  { icon: "😊", title: "Feel Good Factor", text: "Giving back brings a genuine sense of happiness and purpose." },
  { icon: "💎", title: "Donations That Matter", text: "Every item is tracked and delivered directly to the NGO that needs it." },
  { icon: "👁️", title: "Fully Transparent", text: "See exactly which verified NGO partner receives your donation." },
  { icon: "🎁", title: "Get Rewarded", text: "Earn points and surprise perks every time you donate through us." },
  { icon: "🌱", title: "Help the Planet", text: "Keep usable items out of landfills by giving them a second life." },
];

function WhyDonate() {
  return (
    <section className="why-donate">
      <h2>Why Donate With Us</h2>
      <div className="why-donate-grid">
        {benefits.map((b, i) => (
          <div className="benefit-card" key={i}>
            <div className="benefit-icon">{b.icon}</div>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyDonate;