import React from 'react'
import "./auth.css"
import { Link } from 'react-router-dom';



const Register = () => {
  return (
          <div className="auth-page">
          <div className="auth-form">
            <h2>Register</h2>
            <form >
                <label htmlFor="name">Name</label>
              <input
                type="text"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
              />
    
              <label htmlFor="password">Password</label>
              <input
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
              />
    
              <button  className="common-btn">
                {/* {btnLoading ? "Please Wait..." : "Login"} */}
                Register
              </button>
            </form>
            <p>
              have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
  )
}

export default Register