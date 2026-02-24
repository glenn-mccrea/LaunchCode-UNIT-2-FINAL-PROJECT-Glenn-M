import React from "react";
import "./footer.css";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer>
      <div id="footer-links">
        <Link to="/about" className="button-div">
          About HSDT
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
