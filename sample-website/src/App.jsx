import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./pages/Header";
import Footer from "./pages/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import "./styles.css";
export default function App() {
    return (
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
        </BrowserRouter>
    )
}