import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-title">
        <img src="../logo.png" className="logo" alt="logo"/>
        <div><Link to="/">CineScope.</Link></div>
      </div>
      <nav>
        <Link className="home-button" to="/">Home</Link>
        <Link to="/search">Search</Link>
      </nav>
    </header>
  );
}

export default Header;
