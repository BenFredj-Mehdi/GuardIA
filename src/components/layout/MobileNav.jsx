import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, DoorOpen, ShieldHalf, Settings } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/classrooms', label: 'Rooms', icon: DoorOpen },
  { to: '/guardia', label: 'GuardIA', icon: ShieldHalf },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-white/[0.06] bg-base-900/90 backdrop-blur-xl py-2">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className="flex flex-col items-center gap-1 px-2 py-1">
          {({ isActive }) => (
            <>
              <Icon size={18} className={isActive ? 'text-cyan-300' : 'text-slate-500'} />
              <span className={`text-[10px] ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
