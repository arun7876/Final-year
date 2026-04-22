import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Bell, User, Menu, X, LogOut, LogIn } from "lucide-react";

function Topbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
      }
      navigate("/login");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-[#090016]/80 backdrop-blur-xl border-b border-[#2A0A4F] shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
      <div className="h-full px-4 md:px-8 flex items-center justify-between mx-auto">
        
        {/* LEFT: Branding */}
        <div 
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300"
        >
          {/* Logo Icon */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/30 group-hover:border-violet-400/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300">
            <Heart className="w-6 h-6 text-violet-400 group-hover:text-violet-300" />
            <div className="absolute inset-0 bg-violet-400/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Brand Name */}
          <div className="relative">
            <h1 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all duration-300">
              Medimate
            </h1>
            {/* Animated Shimmer Underline */}
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-violet-400 to-fuchsia-400 group-hover:w-full transition-all duration-500 ease-out rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
          </div>
        </div>

        {/* RIGHT: Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          
          {user && (
            <div className="flex items-center gap-4 border-r border-[#2A0A4F] pr-6">
              <button className="relative p-2 rounded-full hover:bg-violet-500/10 text-[#BFAEFF] hover:text-white transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(217,70,239,0.8)]"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-violet-500/10 text-[#BFAEFF] hover:text-white transition-colors duration-200">
                <User className="w-5 h-5" />
              </button>
            </div>
          )}

          {user ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-[#1a0033]/50 border border-[#2A0A4F] hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300 border border-white/10"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          )}
        </div>

        {/* MOBILE: Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#BFAEFF] hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE: Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-[#090016]/95 backdrop-blur-2xl border-b border-[#2A0A4F] py-4 px-6 flex flex-col gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-in slide-in-from-top-2 duration-300">
          {user && (
            <div className="flex items-center gap-4 py-3 border-b border-[#2A0A4F]/50">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center border border-violet-500/30">
                <User className="w-5 h-5 text-violet-300" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">My Profile</p>
                <p className="text-[#BFAEFF] text-xs">Manage account</p>
              </div>
            </div>
          )}
          
          <button className="flex items-center gap-3 text-[#BFAEFF] hover:text-white py-2 transition-colors">
            <Bell className="w-5 h-5" />
            Notifications
            <span className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(217,70,239,0.8)]"></span>
          </button>

          <div className="pt-2 border-t border-[#2A0A4F]/50 mt-2">
            {user ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            ) : (
              <button 
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Topbar;
