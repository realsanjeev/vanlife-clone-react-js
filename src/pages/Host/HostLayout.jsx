import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
    const activeStyle = {
        fontWeight: "bold",
        color: "red",
        textDecoration: "underline"
        
    }
    return(
        <>
            <nav className="host-nav-bar">
                <NavLink to="." end style={({isActive})=> isActive ? activeStyle: null}>Dashboard</NavLink>
                <NavLink to="Vans" style={({isActive})=> isActive ? activeStyle: null}>Vans</NavLink>
                <NavLink to="income" style={({isActive})=> isActive ? activeStyle: null}>Income</NavLink>
                <NavLink to="review" style={({isActive})=> isActive ? activeStyle: null}>Review</NavLink>
            </nav>
            <Outlet/>
        </>

    )
}