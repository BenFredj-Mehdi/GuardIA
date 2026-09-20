import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ title, subtitle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = (user?.name || 'D')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/[0.06] bg-base-950/70 px-6 py-4 backdrop-blur-xl sticky top-0 z-30">
      <div>
        <h1 className="font-display text-lg font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-500 w-56">
          <Search size={15} />
          <span className="text-xs">Search platform...</span>
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-slate-400 hover:text-white hover:border-white/[0.12] transition-colors">
          <Bell size={16} />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse-dot" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] pl-2 pr-3 py-1.5 hover:border-white/[0.12] transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/30 to-purple-500/30 text-[11px] font-semibold text-cyan-200">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-slate-200 leading-none">{user?.name}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{user?.role}</p>
            </div>
            <ChevronDown size={14} className="text-slate-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 glass-panel py-1.5 z-40">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3.5 py-2 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-rose-300 transition-colors"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
