import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CoursesContext";

const Login = () => {
  const navigate = useNavigate();
  const { actionLoading, signIn } = useAuth();
  const { loadUserCourses } = useCourses();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await signIn(email, password, navigate, loadUserCourses);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to continue learning</p>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={actionLoading} className="auth-btn">
            {actionLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot">Forgot Password?</Link>
          <span>
            New here? <Link to="/register">Create account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
