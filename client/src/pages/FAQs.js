import { useState } from "react";
import "./FAQs.css";

const faqs = [
  { q: "How do I schedule a pickup?", a: "Head to the Home page, click Book a Pickup, and follow the steps to choose a location and time slot." },
  { q: "Where do my donations go?", a: "Every donation is delivered to one of our verified NGO partners based on what's needed most." },
  { q: "How should I pack my items?", a: "A simple bag or box works fine — just make sure items are clean and in usable condition." },
  { q: "Which time slots are available?", a: "Slots vary by location and are shown when you schedule your pickup." },
  { q: "Is there a fee for pickup?", a: "Some areas may have a small convenience fee, shown before you confirm your pickup." },
  { q: "Can I drop off instead of scheduling a pickup?", a: "Yes, a self drop-off option is available if that's easier for you." },
];

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faqs-page">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((item, i) => (
          <div className="faq-item" key={i}>
            <button className="faq-question" onClick={() => toggle(i)}>
              {item.q}
              <span>{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && <p className="faq-answer">{item.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;