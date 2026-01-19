import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CoursesContext";

const Login = () => {
  const navigate = useNavigate();

  // 🔐 AuthContext
  const { actionLoading, signIn } = useAuth();

  // 📚 CoursesContext
  const { loadUserCourses } = useCourses();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await signIn(email, password, navigate, loadUserCourses);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>

        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="common-btn"
            disabled={actionLoading}
          >
            {actionLoading ? "Please Wait..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <p>
          <Link to="/forgot">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
