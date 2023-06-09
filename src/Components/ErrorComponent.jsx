import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorComponent() {
    const err = useRouteError();
    const errMessage = err.message;

    return (
        <div className="err-container">
            Sorry: {errMessage}
        </div>
    )
}