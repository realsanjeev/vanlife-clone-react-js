import React from "react";
import quoteImage from "../images/quote.jpg"

export default function Home() {
    return (
        <div className="container">
            <h1>Home is under construction Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere omnis veritatis aliquid sit, minus cupiditate doloremque iusto recusandae provident. Porro minima voluptatem quam dolorem, cum vel iusto officia aliquid. Rerum?

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti animi dignissimos molestias, consequuntur fugit, hic expedita quas veniam nihil odio debitis adipisci, eius mollitia eum ratione error corporis. Consequuntur, at.
            </h1>
            <div className="img-container">
            <img src={quoteImage} alt="Quote for homepage" className="home-img" />
            <button className="link-btn">Dummy Button</button>
            </div>
        </div>
    )
}