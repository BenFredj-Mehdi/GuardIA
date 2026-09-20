import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-base-950">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto grid-bg pb-16 md:pb-0">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
