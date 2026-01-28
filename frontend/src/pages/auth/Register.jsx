import React, { useState } from "react";
import "./auth1.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { actionLoading, signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role

  const submitHandler = async (e) => {
    e.preventDefault();
    signUp(name, email, password, role, navigate); // Pass role to signUp
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account 🚀</h2>
        <p className="auth-subtitle">Start your learning journey</p>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role dropdown */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="role-select"
          >
            <option value="User">User</option>
            <option value="instructor">Instructor</option>
          </select>

          <button disabled={actionLoading} className="auth-btn">
            {actionLoading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="auth-links">
          <span>
            Already registered? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
