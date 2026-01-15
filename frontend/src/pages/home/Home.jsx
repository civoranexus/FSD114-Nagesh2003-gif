import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Test from "../../components/test/test.jsx";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-wrapper">
      <div className="landing-box">
        <h1 className="landing-title">Build Your Future With Smart Learning</h1>
        <p className="landing-tagline">Upskill. Innovate. Succeed.</p>

        <button 
          className="landing-action-btn"
          onClick={() => navigate("/courses")}
        >
          Explore Courses
        </button>
      </div>

      <Test />
    </section>
  );
};

export default Home;
