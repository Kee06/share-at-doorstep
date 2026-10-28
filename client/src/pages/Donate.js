import { useState } from "react";
import FormSelect from "../components/FormSelect";
import "./Donate.css";

const categories = ["Clothes", "Food", "Toys", "Books", "Household", "Other"];
const conditions = ["New", "Good", "Fair", "Used"];

function Donate() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          description,
          condition,
          quantity: Number(quantity),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setStatus("Thank you! Your donation has been recorded.");
      setTitle("");
      setCategory("");
      setDescription("");
      setCondition("");
      setQuantity("");
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
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <FormSelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categories}
          placeholder="Select category"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      

        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <button type="submit">Donate</button>
        {status && <p className="donate-status">{status}</p>}
      </form>
    </div>
  );
}

export default Donate;