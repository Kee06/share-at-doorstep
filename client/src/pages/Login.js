import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [loginMethod, setLoginMethod] = useState("otp");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleGetOtp = async (e) => {
    e.preventDefault();
    setStatus("Checking account...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setStatus(`Sample OTP generated: ${data.sampleOtp}`);
      } else {
        setStatus(data.message || "User not found");
      }
    } catch (err) {
      setStatus("Error connecting to server");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => navigate("/"), 1500);
      } else {
        setStatus(data.message || "Invalid OTP");
      }
    } catch (err) {
      setStatus("Error verifying OTP");
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => navigate("/"), 1500);
      } else {
        setStatus(data.message || "Login failed");
      }
    } catch (err) {
      setStatus("Error connecting to server");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Sign into your SADS account</h1>

        <div className="login-toggle">
          <span>login via:</span>
          <button
            className={loginMethod === "otp" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => {
              setLoginMethod("otp");
              setOtpSent(false);
              setStatus("");
            }}
          >
            SMS OTP
          </button>
          <button
            className={loginMethod === "password" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => {
              setLoginMethod("password");
              setStatus("");
            }}
          >
            PASSWORD
          </button>
        </div>

        <hr />

        {loginMethod === "otp" ? (
          !otpSent ? (
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
              <button type="submit" className="primary-btn">
                GET OTP FOR LOGIN
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <label>
                Enter OTP <span className="required">*</span>
              </label>
              <input
                type="text"
                value={otp}
                placeholder="Enter 123456"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" className="primary-btn">
                VERIFY & LOGIN
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handlePasswordLogin} className="password-form">
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
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="submit-row">
              <button type="submit" className="primary-btn submit-btn">
                SUBMIT
              </button>
            </div>
          </form>
        )}

        {status && <p className="login-status">{status}</p>}

        <div className="first-time">
          <hr />
          <p>FIRST TIME USER?</p>
          <Link to="/register" className="secondary-btn-link">
            <button className="secondary-btn">CLICK HERE</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;