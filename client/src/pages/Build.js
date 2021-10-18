import React from "react";
import BuildMenu from "../components/BuildMenu";
import { Link } from 'react-router-dom';
import Bot from "../components/Bot";
import Cart from "../components/Cart";

const Build = () => {
    return (
        <div className="container" id="build-main">
            <Link to="/" class="back-home">Home</Link>
            <BuildMenu />
            <Cart />
            <Bot />
        </div>
    )
}

export default Build