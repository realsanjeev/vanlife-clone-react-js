import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Pricing() {
    const van = useOutletContext();
    return (
        <div className="container">
            <h3>${van.price} per day</h3>
        </div>
    )
}