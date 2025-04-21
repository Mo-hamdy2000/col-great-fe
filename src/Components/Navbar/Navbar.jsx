import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarData } from "./NavbarData";
import "./Navbar.css";

export default function Navbar() {
  const { pathname: path } = useLocation()

  return (
    <div className="navbar">
      {NavbarData.map((item, index) => {
        return (
          <div key={index} className="nav-item">
            <Link to={item.path} className={path.includes(item.path) ? "active" : ""}>
              <div>{item.title}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
