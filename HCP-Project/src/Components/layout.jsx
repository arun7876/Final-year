import Sidebar from "./sidebar";
import Topbar from "./topbar";
import "../styles/layout.css";


function Layout({ children, user, onLogout }) {
  return (
    <div>
      <Sidebar />
      <Topbar user={user} onLogout={onLogout} />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
