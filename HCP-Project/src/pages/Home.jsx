import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home({ user, onLogout }) {
  const nav = useNavigate();

  const handleLogout = () => {
    onLogout();
    nav("/login");
  };

  // Module cards configuration
  const modules = [
    {
      id: 1,
      title: "Symptoms Input",
      description: "Select and input your health symptoms",
      icon: "🤒",
      path: "/symptoms",
      color: "#FF6B6B"
    },
    {
      id: 2,
      title: "Disease Prediction",
      description: "Get AI-powered disease predictions",
      icon: "📊",
      path: "/prediction",
      color: "#4ECDC4"
    },
    {
      id: 3,
      title: "Doctor Recommendation",
      description: "Find specialized doctors for your condition",
      icon: "👨‍⚕️",
      path: "/doctor",
      color: "#45B7D1"
    },
    {
      id: 4,
      title: "Health Chatbot",
      description: "Get instant health advice and tips",
      icon: "💬",
      path: "/chatbot",
      color: "#96CEB4"
    }
  ];

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Smart Health Prediction System</h1>
          <p className="subtitle">AI-powered healthcare intelligence platform</p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="user-info-card">
        <div className="user-details">
          <div className="user-avatar">👤</div>
          <div className="user-content">
            <h3>Welcome, {user?.email?.split('@')[0] || 'User'}!</h3>
            <p className="user-email">{user?.email}</p>
            <p className="user-status">✅ Account Active</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* System Overview Stats */}
      <div className="overview-section">
        <h2>System Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-content">
              <h4>19</h4>
              <p>Symptoms Tracked</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🤖</div>
            <div className="stat-content">
              <h4>98%</h4>
              <p>Model Accuracy</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-content">
              <h4>3+</h4>
              <p>Partner Doctors</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h4>24/7</h4>
              <p>Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards Section */}
      <div className="modules-section">
        <h2>Main Features</h2>
        <div className="modules-grid">
          {modules.map(module => (
            <div
              key={module.id}
              className="module-card"
              style={{ borderTop: `4px solid ${module.color}` }}
              onClick={() => nav(module.path)}
            >
              <div className="module-icon">{module.icon}</div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <button className="module-btn" style={{ backgroundColor: module.color }}>
                Access Module →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="quick-start-section">
        <h2>How to Get Started</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Select Symptoms</h4>
            <p>Go to Disease Prediction module to see your health analysis</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Get Prediction</h4>
            <p>Visit Disease Prediction to receive AI-powered diagnosis suggestions</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Find Doctor</h4>
            <p>Access Doctor Recommendation to find specialists</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h4>Get Support</h4>
            <p>Use the Health Chatbot for instant advice and health tips</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
