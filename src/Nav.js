import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';


function Nav() {
    const navStyle= {
        color: 'white'
    };

    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link style={navStyle} to="/main">
                <li>Tracker</li>
                </Link>
                <Link style={navStyle} to="/material">
                 <li>Materials</li>   
                </Link>
                <Link style={navStyle} to="/todo">
                <li>TodoTask</li>
                </Link>
            </ul>
        </nav>    
    );
}

export default Nav;