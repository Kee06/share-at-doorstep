import { useState } from "react";
import "./StaticPage.css";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="static-page">
      <h1>Send a Query</h1>
      <p>Have a question or need help? Send us a message and we'll get back to you.</p>
      {submitted ? (
        <p>Thanks for reaching out — we'll be in touch soon!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required style={{ width: "100%", padding: 12, marginBottom: 12 }} />
          <input type="email" placeholder="Your Email" required style={{ width: "100%", padding: 12, marginBottom: 12 }} />
          <textarea placeholder="Your Message" required rows={4} style={{ width: "100%", padding: 12, marginBottom: 12 }} />
          <button type="submit" style={{ background: "#3e2723", color: "white", padding: "12px 24px", border: "none", borderRadius: 6 }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;