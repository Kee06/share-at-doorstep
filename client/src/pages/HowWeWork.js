import "./HowWeWork.css";

const steps = [
  "Go to our Home page and enter your pickup location.",
  "Choose whether you want a doorstep pickup or a self drop-off.",
  "Select a convenient time slot and fill in your details.",
  "We'll collect your donation and deliver it to a verified NGO.",
];

function HowWeWork() {
  return (
    <div className="how-we-work-page">
      <h1>How We Work</h1>
      <p>
        Making a donation shouldn't take up your whole day. Here's exactly
        how the process works, start to finish.
      </p>
      <h2>Scheduling a Pickup</h2>
      <ol>
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

export default HowWeWork;