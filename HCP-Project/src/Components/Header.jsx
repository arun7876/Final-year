import { Link } from "react-router-dom"
import "./header.css";

function Header(){
    return (
        <nav className="navbar">
            <h2> Smart Healthcare</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/symptoms">Symptoms</Link>
                <Link to="/prediction">Prediction</Link>
                <Link to="/doctors">Doctor</Link>
                <Link to="/chatbot">Chatbot</Link>
            </div>
        </nav>
    );
}

export  default Header;