import { useNavigate } from "react-router-dom";
import "../styles/topbar.css";

function Topbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
      }
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-logo">
          <img src="/20260208_224042_0000.png" alt="HCP Logo" className="logo-image"/>
          <span className="logo-text">HCP</span>
        </div>
      </div>

      <div className="topbar-right">
        {user ? (
          <button className="topbar-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="topbar-login-btn" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Topbar;
