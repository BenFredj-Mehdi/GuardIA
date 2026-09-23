import { motion } from 'framer-motion';
import { Users, DoorOpen, TrendingUp, ShieldAlert, Activity, Radio, UserPlus, Server } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import PageTransition from '../components/ui/PageTransition';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import students from '../data/students.json';
import classrooms from '../data/classrooms.json';
import activity from '../data/activity.json';
import cameras from '../data/cameras.json';
import { useAuth } from '../context/AuthContext';

const activityIcon = {
  system: Server,
  attendance: Activity,
  access: DoorOpen,
  enrollment: UserPlus,
};

export default function Dashboard() {
  const { user } = useAuth();
  const avgAttendance = Math.round(
    students.reduce((sum, s) => sum + s.attendance, 0) / students.length
  );
  const totalOccupancy = classrooms.reduce((sum, c) => sum + c.occupancy, 0);
  const totalCapacity = classrooms.reduce((sum, c) => sum + c.capacity, 0);
  const activeAlerts = cameras.filter((c) => c.alert).length;

  return (
    <>
      <Topbar
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Director'}`}
        subtitle="Here's what's happening across campus today"
      />
      <PageTransition className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Students"
            value={students.length.toLocaleString()}
            trend={{ positive: true, value: '4.2%', label: 'vs last term' }}
            glow="blue"
            delay={0}
          />
          <StatCard
            icon={DoorOpen}
            label="Active Classrooms"
            value={`${classrooms.length}`}
            trend={{ positive: true, value: `${Math.round((totalOccupancy / totalCapacity) * 100)}%`, label: 'avg occupancy' }}
            glow="purple"
            delay={0.05}
          />
          <StatCard
            icon={TrendingUp}
            label="Attendance Rate"
            value={`${avgAttendance}%`}
            trend={{ positive: avgAttendance >= 85, value: `${avgAttendance >= 85 ? '+' : '-'}${Math.abs(avgAttendance - 85)}%`, label: 'vs target' }}
            glow="cyan"
            delay={0.1}
          />
          <StatCard
            icon={ShieldAlert}
            label="Security Alerts Today"
            value={String(activeAlerts)}
            trend={
              activeAlerts > 0
                ? { positive: false, value: 'Action needed', label: 'GuardIA status' }
                : { positive: true, value: 'Nominal', label: 'GuardIA status' }
            }
            glow="red"
            delay={0.15}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-semibold text-white">GuardIA Live Status</h2>
                <p className="text-xs text-slate-500 mt-0.5">Real-time monitoring node overview</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                All Nodes Online
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Main Entrance', 'Library', 'Parking Lot', 'Corridor A', 'Cafeteria', 'Gymnasium', 'Lab Building', 'Rear Exit'].map((loc, i) => (
                <div
                  key={loc}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 flex items-center gap-2"
                >
                  <Radio size={13} className="text-cyan-400 shrink-0" />
                  <span className="text-[11px] text-slate-400 truncate">{loc}</span>
                </div>
              ))}
            </div>

            <a
              href="/guardia"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              Open GuardIA command center →
            </a>
          </GlassCard>

          <GlassCard
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="p-6"
          >
            <h2 className="font-display font-semibold text-white mb-5">Recent Activity</h2>
            <div className="space-y-4">
              {activity.slice(0, 6).map((item, i) => {
                const Icon = activityIcon[item.type] || Activity;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="flex gap-3"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-slate-400">
                      <Icon size={13} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-300 leading-snug">{item.message}</p>
                      <p className="text-[10px] text-slate-600 mt-1">{item.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </PageTransition>
    </>
  );
}
