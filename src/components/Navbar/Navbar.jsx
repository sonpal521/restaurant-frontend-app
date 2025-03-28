import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import openIcon from "../../assets/open_icon.png";
import closeIcon from "../../assets/close_icon.png";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const [hasShadow, setHasShadow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu toggle state

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`nav ${hasShadow ? "scrolled" : ""}`}>
      <Link to="/">
        <h2>TastyCloud</h2>
      </Link>

    
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
  <img src={isMenuOpen ? closeIcon : openIcon} alt="menu" />
</div>

      {/* Navigation Menu */}
      <ul className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
        <a href="#hero" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Home
        </a>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>
          Menu
        </a>
        <a href="#contact-us" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>
          Contact Us
        </a>
      </ul>

      <div className="nav-right">
        <div className="nav-icon">
          <Link to="/cart">
            <img src={assets.shop_icon} alt="cart" />
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </Link>
        </div>

        {!token ? (
          <button className="nav-btn" onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="nav-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="orders" /> Orders
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
