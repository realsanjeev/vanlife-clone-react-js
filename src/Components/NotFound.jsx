import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    const path = window.location.pathname
    return (
        <div className="main-container not-found">
            <h1>404 Error.</h1> 
            <pre>{path} path doesnot exist</pre>
            <div>
                <Link to="..">
                <button className="btn-not">Back to Home Page</button>
                </Link>
            </div>
        </div>
    )
}