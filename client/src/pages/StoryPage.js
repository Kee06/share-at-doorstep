import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { stories } from "../data/stories";
import "./StaticPage.css";

function StoryPage() {
  const { slug } = useParams();
  const story = stories.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!story) {
    return (
      <div className="static-page">
        <h1>Story not found</h1>
        <p>We couldn't find that story.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="static-page">
      <Link to="/" style={{ color: "#f15622", textDecoration: "none" }}>
        ← Back to Home
      </Link>
      <h1 style={{ marginTop: 16 }}>{story.title}</h1>
      {story.body.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

export default StoryPage;