import React from "react";
import BuildMenu from "../components/BuildMenu";
import { Link, useParams } from 'react-router-dom';
import Bot from "../components/Bot";

const Build = () => {
    return (
        <div className="container" id="build-main">
            <Link to="/" class="back-home">Home</Link>
            <BuildMenu />
            <Bot />
        </div>
    )
}

export default Build