import { Link } from "react-router-dom"
import { CiMedicalCase } from "react-icons/ci";
import { LiaCommentsSolid } from "react-icons/lia";
import { GrAd } from "react-icons/gr";
import { CgEditBlackPoint } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import "../styles/sidebar.css";

function Sidebar(){
    return (
        <div className="sidebar">
            <h2 className="logo"> Health AI</h2>

            <nav>
                    <Link to="/" className="nav-link">
                        <LuLayoutDashboard className="nav-icon" size={24}/>
                        <span className="nav-text">Dashboard</span>
                    </Link>
                    <Link to="/symptoms" className="nav-link">
                        <CgEditBlackPoint className="nav-icon" size={24} />
                        <span className="nav-text">Symptoms</span>
                    </Link>
                    <Link to="/prediction" className="nav-link">
                        <GrAd className="nav-icon" size={24} />
                        <span className="nav-text">Prediction</span>
                    </Link>
                    <Link to="/doctors" className="nav-link">
                        <CiMedicalCase className="nav-icon" size={24} />
                        <span className="nav-text">Hospital</span>
                    </Link>
                    <Link to="/chatbot" className="nav-link">
                        <LiaCommentsSolid className="nav-icon" size={24} />
                        <span className="nav-text">Chatbot</span>
                    </Link>
            </nav>
        </div>
    );
}
export default Sidebar;