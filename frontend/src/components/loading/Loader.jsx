import React from "react";
import "./loader.css";

const LoadingScreen = () => {
  return (
    <div className="loading-wrapper">
      <div className="spinner-container">
        <div className="spinner-ring"></div>
        <p className="loading-text">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
