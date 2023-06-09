import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Details(){
    const van = useOutletContext();
    return (
        <div className="container">
            <p>{van.description}</p>
        </div>
    )
}