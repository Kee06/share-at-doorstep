import { useState } from "react";
import "./Login.css";

function Login() {
  const [loginMethod, setLoginMethod] = useState("otp"); // "otp" or "password"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleGetOtp = (e) => {
    e.preventDefault();
    setStatus("OTP sent (not yet connected to backend)");
    // TODO: connect to POST /api/auth/send-otp once Member 1 builds it
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setStatus("Logging in (not yet connected to backend)");
    // TODO: connect to POST /api/auth/login
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Sign into your SADS account</h1>

        <div className="login-toggle">
          <span>login via:</span>
          <button
            className={loginMethod === "otp" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => setLoginMethod("otp")}
          >
            SMS OTP
          </button>
          <button
            className={loginMethod === "password" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => setLoginMethod("password")}
          >
            PASSWORD
          </button>
        </div>

        <hr />

        {loginMethod === "otp" ? (
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
            <p className="forgot-link">Forgot or Don't have a password?</p>
            </form>
        )}

        {status && <p className="login-status">{status}</p>}

        <div className="first-time">
          <hr />
          <p>FIRST TIME USER?</p>
          <button className="secondary-btn">CLICK HERE</button>
        </div>
      </div>
    </div>
  );
}

export default Login;