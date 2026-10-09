import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Sparkles, 
  CheckSquare, 
  Award, 
  User, 
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    if (onClose) onClose();
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Learning', path: '/learn/python-data-science', icon: BookOpen },
    { name: 'Recommendations', path: '/recommendations', icon: Sparkles },
    { name: 'Assessments', path: '/assessments', icon: CheckSquare },
    { name: 'Certificates', path: '/certificates', icon: Award },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className={`w-64 bg-white border-r border-[#e2ece9] flex flex-col justify-between p-4 h-full ${className}`}>
      <div>
        {/* User Card */}
        <div className="p-3 mb-6 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#007f70] flex items-center justify-center font-bold text-white shadow-sm">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#142a2b] truncate">{user?.fullName || 'Active Learner'}</p>
            <p className="text-xs text-[#647878] truncate">{user?.email || 'learner@skillbridge.edu'}</p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold tracking-wider text-[#647878] uppercase px-3 mb-2">
            Platform Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                  ${isActive 
                    ? 'bg-[#e6f3f0] text-[#007f70] border border-[#cde4df] shadow-sm font-semibold' 
                    : 'text-[#647878] hover:text-[#142a2b] hover:bg-[#f4f8f7]'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#647878]" />
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Area */}
      <div className="pt-4 border-t border-[#e2ece9] space-y-2">
        <NavLink
          to="/verify/SB-2026-X892B"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#647878] hover:text-[#007f70] hover:bg-[#f4f8f7] transition"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#007f70]" />
          <span>Certificate Verification Portal</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#be123c] hover:bg-[#fff1f2] transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
