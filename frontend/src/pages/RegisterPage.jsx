import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import './RegisterPage.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:5000/";
    try {
      const res = await fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          firstName,
          lastName,
          dob,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // redirect to login after success
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="register-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            className="register-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          {/* Date picker */}
          <input
            type="date"
            className="register-input"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Username"
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {error && <p className="register-error">{error}</p>}

        <div className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;