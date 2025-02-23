import React from "react";
import "./footer.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2025 LearnSphere. All rights reserved.
          <br />
          Made with ❤️ <a href="">Kurshid Alam</a>
        </p>
        <div className="social-links">
          <a href="">
            <FaFacebookSquare />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
