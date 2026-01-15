import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const SiteFooter = () => {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © 2026 Eduvillage E-Learning Platform — All Rights Reserved
        </p>

        <div className="footer-icons">
          <a href="#"><AiFillFacebook /></a>
          <a href="#"><AiFillTwitterSquare /></a>
          <a href="#"><AiFillInstagram /></a>
        </div>

        <p className="footer-credit">
          Built with ❤️ by <span>Nagesh Shahane</span>
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
