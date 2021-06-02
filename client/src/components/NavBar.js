import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="wrapper">
            <nav className="navbar" id="navbar">
                <ul className="navlist">
                    <li>
                        <h1>Exercise Tracker</h1>
                    </li>
                    <li className="link">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="link">
                        <Link to="/createuser">Create User</Link>
                    </li>
                    <li className="link">
                        <Link to="/addexercise">Add Exercise</Link>
                    </li>
                    <li className="link">
                        <Link to="/viewlog">View Exercise Log</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;