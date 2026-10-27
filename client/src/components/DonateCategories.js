import { useState } from "react";
import "./DonateCategories.css";

const categories = [
  {
    name: "Clothes",
    accepts: [
      "Clean, wearable clothing for all ages",
      "Jackets, sweaters, and school uniforms",
      "Sarees, kurtas, and everyday wear",
    ],
    tip: "Wash and fold items before packing.",
  },
  {
    name: "Shoes",
    accepts: [
      "Shoes and sandals in usable condition",
      "School shoes and sports shoes",
      "Slippers and boots",
    ],
    tip: "Tie each pair together so they don't get separated.",
  },
  {
    name: "Books",
    accepts: [
      "Textbooks and reference books",
      "Story books and novels",
      "Children's books and comics",
    ],
    tip: "Pack books in a sturdy bag or box so pages don't get damaged.",
  },
  {
    name: "Toys",
    accepts: [
      "Soft toys and dolls",
      "Board games and puzzles with all pieces",
      "Educational toys and building blocks",
    ],
    tip: "Clean toys and check that nothing is broken or missing parts.",
  },
  {
    name: "Furniture",
    accepts: [
      "Chairs, tables, and study desks",
      "Shelves and storage units",
      "Beds and cots in good condition",
    ],
    tip: "Mention the size of larger items when booking so we can plan the pickup.",
  },
  {
    name: "Stationery",
    accepts: [
      "Notebooks and unused writing pads",
      "Pens, pencils, and geometry boxes",
      "School bags and lunch boxes",
    ],
    tip: "Group small items together in one bag.",
  },
];

function DonateCategories() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (name) => {
    setSelected(selected === name ? null : name);
  };

  const active = categories.find((c) => c.name === selected);

  return (
    <section className="categories">
      <h2>Donate Almost Anything</h2>
      <div className="categories-grid">
        {categories.map((c) => (
          <button
            key={c.name}
            className={`category-chip ${selected === c.name ? "active" : ""}`}
            onClick={() => handleSelect(c.name)}
            aria-expanded={selected === c.name}
          >
            {c.name}
          </button>
        ))}
      </div>

      {active && (
        <div className="category-panel">
          <h3>What we accept: {active.name}</h3>
          <ul>
            {active.accepts.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="category-tip">
            <strong>Packing tip:</strong> {active.tip}
          </p>
          <a href="http://localhost:5000/pickup.html" className="category-cta">
            Book a Pickup
          </a>
        </div>
      )}
    </section>
  );
}

export default DonateCategories;