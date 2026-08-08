import "./BrandCollab.css";

function BrandCollab() {
  return (
    <section className="brand-collab">
      <h2>Are You a Conscious Brand?</h2>
      <p>Here's how we can partner together</p>
      <div className="collab-grid">
        <div className="collab-card">
          <h3>Circularity Initiatives</h3>
          <p>Give your products a second life and connect with customers on sustainability.</p>
        </div>
        <div className="collab-card">
          <h3>Employee Engagement</h3>
          <p>Run donation drives that bring your team together for a shared cause.</p>
        </div>
        <div className="collab-card">
          <h3>Marketing Campaigns</h3>
          <p>Partner with us on campaigns that highlight your brand's impact.</p>
        </div>
      </div>
    </section>
  );
}

export default BrandCollab;