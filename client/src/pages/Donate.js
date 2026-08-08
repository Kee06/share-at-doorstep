import { useState } from "react";
import "./Donate.css";

function Donate() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemName, category }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setStatus("Thank you! Your donation has been recorded.");
      setItemName("");
      setCategory("");
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="donate-page">
      <form className="donate-form" onSubmit={handleSubmit}>
        <h1>Donate an Item</h1>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">Donate</button>
        {status && <p className="donate-status">{status}</p>}
      </form>
    </div>
  );
}

export default Donate;