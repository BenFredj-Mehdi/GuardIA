import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, DoorOpen, ShieldHalf, Settings, ShieldCheck } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/classrooms', label: 'Classrooms', icon: DoorOpen },
  { to: '/guardia', label: 'GuardIA', icon: ShieldHalf, highlight: true },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-white/[0.06] bg-base-900/60 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-glow-blue">
          <ShieldCheck size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="font-display font-bold text-white leading-none tracking-tight">GuardIA</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Campus Platform</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon, highlight }) => (
          <NavLink key={to} to={to} className="relative block">
            {({ isActive }) => (
              <div
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon
                  size={17}
                  strokeWidth={2}
                  className={`relative z-10 ${
                    isActive && highlight ? 'text-cyan-300' : isActive ? 'text-cyan-300' : ''
                  }`}
                />
                <span className="relative z-10">{label}</span>
                {highlight && (
                  <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-dot" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-5">
        <div className="glass-panel px-4 py-3.5 bg-gradient-to-br from-emerald-500/10 to-transparent">
          <div className="flex items-center gap-2 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="font-medium text-slate-300">All systems nominal</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">8/8 monitoring nodes online</p>
        </div>
      </div>
    </aside>
  );
}
