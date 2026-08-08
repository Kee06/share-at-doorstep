import "./Stories.css";

const stories = [
  {
    title: "How One Family's Donation Reached a Local Shelter",
    text: "A single doorstep pickup turned a closet full of old clothes into warm layers for kids at a nearby shelter — all within 48 hours.",
  },
  {
    title: "Why Donating Beats Throwing Away",
    text: "Every year, usable items end up in landfills simply because donating feels inconvenient. Doorstep pickup removes that barrier entirely.",
  },
  {
    title: "Meet the NGOs We Work With",
    text: "From children's education to elderly care, our partner NGOs put every donated item directly into the hands of someone who needs it.",
  },
];

function Stories() {
  return (
    <section className="stories">
      <h2>Stories & Impact</h2>
      <p className="stories-intro">
        Real donations, real impact — a look at where your items go after pickup.
      </p>
      <div className="stories-grid">
        {stories.map((s, i) => (
          <div className="story-card" key={i}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stories;