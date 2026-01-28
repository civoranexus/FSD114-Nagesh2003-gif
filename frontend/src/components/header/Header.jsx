import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ authenticated }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-highlight">Eduvillage</span>
        <span className="brand-sub">E-Learning</span>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/about">About</Link>

        {authenticated ? (
          <Link to="/account" className="nav-btn">
            Account
          </Link>
        ) : (
          <Link to="/login" className="nav-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
