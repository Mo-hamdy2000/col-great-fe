import React from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import logo from "../../Assets/logo.png";

const Header = () => (
  <center>  
    <header className="site-header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="site-logo" />
        </div>
      </div>
      <Navbar className="header-nav" />
    </header>
  </center>
);

export default Header;
