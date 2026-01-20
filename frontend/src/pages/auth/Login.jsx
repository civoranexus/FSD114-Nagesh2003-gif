// import React, { useState } from "react";
// import "./auth.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useCourses } from "../../context/CoursesContext";

// const Login = () => {
//   const navigate = useNavigate();

//   // 🔐 AuthContext
//   const { actionLoading, signIn } = useAuth();

//   // 📚 CoursesContext
//   const { loadUserCourses } = useCourses();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await signIn(email, password, navigate, loadUserCourses);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-form">
//         <h2>Login</h2>

//         <form onSubmit={submitHandler}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="common-btn"
//             disabled={actionLoading}
//           >
//             {actionLoading ? "Please Wait..." : "Login"}
//           </button>
//         </form>

//         <p>
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>

//         <p>
//           <Link to="/forgot">Forgot password?</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


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
