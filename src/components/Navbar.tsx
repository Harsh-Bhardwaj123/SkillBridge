import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DemoBadge } from './DemoBadge';
import { 
  Menu, 
  X, 
  LogOut, 
  User, 
  BookOpen, 
  Award,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#f4f8f7]/90 backdrop-blur-md border-b border-[#e2ece9] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#007f70] flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition">
              SB
            </div>
            <span className="text-xl font-bold tracking-tight text-[#142a2b]">
              SkillBridge
            </span>
          </Link>

          {/* Desktop Nav Links (Matching Framer Nav) */}
          <div className="hidden md:flex items-center gap-7">
            <Link 
              to="/" 
              className={`text-sm font-medium transition ${isActive('/') ? 'text-[#007f70] font-semibold' : 'text-[#647878] hover:text-[#142a2b]'}`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition ${isActive('/dashboard') ? 'text-[#007f70] font-semibold' : 'text-[#647878] hover:text-[#142a2b]'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/recommendations" 
              className={`text-sm font-medium transition ${isActive('/recommendations') ? 'text-[#007f70] font-semibold' : 'text-[#647878] hover:text-[#142a2b]'}`}
            >
              Recommendations
            </Link>
            <Link 
              to="/learn/python-data-science" 
              className={`text-sm font-medium transition ${isActive('/learn') ? 'text-[#007f70] font-semibold' : 'text-[#647878] hover:text-[#142a2b]'}`}
            >
              Learning
            </Link>
            <Link 
              to="/assessments" 
              className={`text-sm font-medium transition ${isActive('/quiz') || isActive('/assessments') ? 'text-[#007f70] font-semibold' : 'text-[#647878] hover:text-[#142a2b]'}`}
            >
              Quiz
            </Link>
            <Link 
              to="/certificates" 
              className={`text-sm font-medium transition ${isActive('/certificates') ? 'text-[#007f70] font-semibold' : 'text-[#647878] hover:text-[#142a2b]'}`}
            >
              Certificates
            </Link>
            <Link 
              to="/profile" 
              className={`text-sm font-medium transition ${isActive('/profile') ? 'text-[#007f70] font-semibold' : 'text-[#647878] hover:text-[#142a2b]'}`}
            >
              Profile
            </Link>
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <DemoBadge />

            {user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/learn/python-data-science"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] transition shadow-sm"
                >
                  <span>My learning</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-[#647878] hover:text-rose-600 transition rounded-lg hover:bg-black/5"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-[#647878] hover:text-[#142a2b] px-2 py-1 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] transition shadow-sm"
                >
                  <span>My learning</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <DemoBadge />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#142a2b] hover:bg-black/5 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e2ece9] bg-[#f4f8f7] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#142a2b] hover:bg-white"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#142a2b] hover:bg-white"
          >
            Dashboard
          </Link>
          <Link
            to="/recommendations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#142a2b] hover:bg-white"
          >
            Recommendations
          </Link>
          <Link
            to="/learn/python-data-science"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#142a2b] hover:bg-white"
          >
            Learning
          </Link>
          <Link
            to="/assessments"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#142a2b] hover:bg-white"
          >
            Quiz
          </Link>
          <Link
            to="/certificates"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#142a2b] hover:bg-white"
          >
            Certificates
          </Link>
          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#142a2b] hover:bg-white"
          >
            Profile
          </Link>

          <div className="pt-3 border-t border-[#e2ece9] flex items-center justify-between">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-rose-600 flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out ({user.fullName})</span>
              </button>
            ) : (
              <div className="flex gap-2 w-full">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-full text-xs font-semibold bg-white border border-[#e2ece9] text-[#142a2b]"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-full text-xs font-semibold bg-[#007f70] text-white"
                >
                  My learning
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
