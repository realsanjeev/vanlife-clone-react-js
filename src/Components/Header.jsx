import React from "react";
import { Link, NavLink } from "react-router-dom";
import accountAvatar from "../Images/user-avatar.png"
import logOut from "../Images/log-out.png"

export default function Header() {
    // const activeStyle = {
    //     fontWeight: "bold",
    //     color: "red"
    // }

    function handleLogOut(){
        localStorage.removeItem("isLoggedIn")
    }
    return(
        <>
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink to="/host" className={({isActive})=> isActive ? "chosen": ""}>Host</NavLink>
                <NavLink to="/about" className={({isActive})=> isActive ? "chosen": ""}>About</NavLink>
                <NavLink to="/vans" className={({isActive})=> isActive ? "chosen": ""}>Vans</NavLink>
                <Link to="login" className="login-link">
                    <img 
                        src={accountAvatar}
                        className="login-icon"
                        alt="user-profile avatar"
                    />
                </Link>
                {localStorage.getItem("isLoggedIn") === "true" && (
                    <Link to="/login?message=Log in to rent van">
                        <img
                            src={logOut}
                            className="login-icon"
                            alt="log-out symbol"
                            onClick={handleLogOut}
                        />
                    </Link>
                )}
            </nav>
        </header>
        </>
    );
}
