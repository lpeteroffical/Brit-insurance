import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "./firebase";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and SignUp
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added to store error messages
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear errors when toggling between forms
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      if (isLogin) {
        await login(email, password);
        navigate("/form"); // Redirects to the form page
      } else {
        await signUp(email, password);
        alert("Sign up successful! Please log in.");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use. Please login or reset your password.");
      } else {
        setError(error.message); // Handle other errors more generically
      }
    }
  };

  /////////////////////////////////////////

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await login(email, password);
      navigate("/form"); // Redirects to the form page
    } catch (error) {
      setError(error.message); // Handle errors
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await signUp(email, password);
      alert("Sign up successful! Please log in.");
    } catch (error) {
      setError(error.message); // Handle errors
    }
  };

  /////////////////////////////////////////

  return (
    <div className="auth-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Display any error that occurred */}
      <form>
        <button className="signup-btn" onClick={handleSignUp}>
          Sign Up
        </button>
        <div className="auth-form-group">
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="auth-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
