import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="wrapper">
            <nav id="navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/createuser">Create User</Link>
                    </li>
                    <li>
                        <Link to="/addexercise">Add Exercise</Link>
                    </li>
                    <li>
                        <Link to="/viewlog">View Exercise Log</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;