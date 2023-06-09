import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Photos(){
    const van= useOutletContext();
    return (
        <div className="container">
            <img src={van.imageUrl} alt={`${van.type} van type`} />
        </div>
    )
}