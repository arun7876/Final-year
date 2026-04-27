import { Link } from "react-router-dom"
import "../styles/sidebar.css";

function Sidebar(){
    return (
        <div className="sidebar">
            <h2 className="logo"> Health AI</h2>

            <nav>
                    <Link to="/" className="nav-link">
                        <span className="nav-icon">🏠</span>
                        <span className="nav-text">Dashboard</span>
                    </Link>
                    <Link to="/symptoms" className="nav-link">
                        <span className="nav-icon">🤒</span>
                        <span className="nav-text">Symptoms</span>
                    </Link>
                    <Link to="/prediction" className="nav-link">
                        <span className="nav-icon">📊</span>
                        <span className="nav-text">Prediction</span>
                    </Link>
                    <Link to="/doctors" className="nav-link">
                        <span className="nav-icon">👨‍⚕️</span>
                        <span className="nav-text">Doctors</span>
                    </Link>
                    <Link to="/chatbot" className="nav-link">
                        <span className="nav-icon">💬</span>
                        <span className="nav-text">Chatbot</span>
                    </Link>
            </nav>
        </div>
    );
}
export default Sidebar;