import { Link } from "react-router-dom";
import { stories } from "../data/stories";
import "./Stories.css";

function Stories() {
  return (
    <section className="stories">
      <h2>Stories & Impact</h2>
      <p className="stories-intro">
        Real donations, real impact — a look at where your items go after pickup.
      </p>
      <div className="stories-grid">
        {stories.map((s) => (
          <Link to={`/stories/${s.slug}`} className="story-card" key={s.slug}>
            <h3>{s.title}</h3>
            <p>{s.summary}</p>
            <span className="story-readmore">Read more →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Stories;