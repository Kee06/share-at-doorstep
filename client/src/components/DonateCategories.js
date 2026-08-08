import "./DonateCategories.css";

const categories = ["Clothes", "Shoes", "Books", "Toys", "Furniture", "Stationery"];

function DonateCategories() {
  return (
    <section className="categories">
      <h2>Donate Almost Anything</h2>
      <div className="categories-grid">
        {categories.map((c) => (
          <div className="category-chip" key={c}>{c}</div>
        ))}
      </div>
    </section>
  );
}

export default DonateCategories;