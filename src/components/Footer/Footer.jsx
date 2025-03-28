import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <section id="contact-us">
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <h2>TastyCloud</h2>
            <p>
              TastyCloud is a dynamic food platform connecting food lovers,
              chefs, and restaurants with interactive menus, AI-powered
              recommendations, and seamless online ordering
            </p>

            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="facebook" />

              <img src={assets.linkedin_icon} alt="linkedin" />

              <img src={assets.twitter_icon} alt="twitter" />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+91-755-542-6849</li>
              <li>shohan@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 @ Restaurant App</p>
      </div>
    </section>
  );
}

export default Footer;
