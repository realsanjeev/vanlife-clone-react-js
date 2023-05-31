import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/ying-yang.png";

export default function Header() {
    return(
        <nav className="nav-bar">
            <div className="header-container">
                <img src={headerLogo} alt="Real uniquee profile icon" className="header-logo"/>
                <h2 className="header-brand">Real Uniquee</h2>
                <ul className="nav-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
        </nav>
    )
}