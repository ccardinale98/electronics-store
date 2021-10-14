import React from "react";
import BuildMenu from "../components/BuildMenu";
import { Link, useParams } from 'react-router-dom';

const Build = () => {
    return (
        <div className="container">
            <Link to="/">← Back to Products</Link>
            <BuildMenu />
        </div>
    )
}

export default Build