import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleGetOtp = async (e) => {
    e.preventDefault();
    setStatus("Registering user...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, mobile }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`Registered! Your sample OTP is: ${data.sampleOtp}`);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setStatus(data.message || "Registration failed");
      }
    } catch (err) {
      setStatus("Error connecting to backend server");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Sign into your SADS account</h1>
        <p className="one-time-label">ONE-TIME REGISTRATION</p>
        <hr />

        <form onSubmit={handleGetOtp}>
          <label>
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <hr />

          <label>
            Mobile <span className="required">*</span>
          </label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <div className="submit-row">
            <button type="submit" className="primary-btn submit-btn">
              GET OTP
            </button>
          </div>
        </form>

        {status && <p className="login-status">{status}</p>}

        <div className="first-time">
          <p>ALREADY HAVE AN ACCOUNT?</p>
          <Link to="/login" className="secondary-btn-link">
            <button className="secondary-btn">CLICK HERE</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;