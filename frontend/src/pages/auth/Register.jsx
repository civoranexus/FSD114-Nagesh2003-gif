// import React, { useState } from "react";
// import "./auth.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Register = () => {
//   const navigate = useNavigate();

//   const { actionLoading, signUp } = useAuth();

//   // 🔒 KEEP VARIABLE NAMES SAME
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     signUp(name, email, password, navigate);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-form">
//         <h2>Create Your Account</h2>

//         <form onSubmit={submitHandler}>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

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
//             disabled={actionLoading}
//             className="common-btn"
//           >
//             {actionLoading ? "Please Wait..." : "Register"}
//           </button>
//         </form>

//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { actionLoading, signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    signUp(name, email, password, navigate);
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
