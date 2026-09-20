import { motion } from 'framer-motion';
import { User, Bell, ShieldHalf, Palette } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import PageTransition from '../components/ui/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { useAuth } from '../context/AuthContext';

function Toggle({ defaultChecked = false }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
      <div className="h-6 w-11 rounded-full bg-white/[0.08] transition-colors peer-checked:bg-cyan-500/70 after:absolute after:left-[3px] after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
    </label>
  );
}

const sections = [
  {
    icon: User,
    title: 'Account',
    rows: [
      { label: 'Two-factor authentication', desc: 'Require a second verification step at sign-in', checked: true },
      { label: 'Session auto-lock', desc: 'Lock the dashboard after 15 minutes of inactivity', checked: false },
    ],
  },
  {
    icon: ShieldHalf,
    title: 'GuardIA Monitoring',
    rows: [
      { label: 'Real-time alert notifications', desc: 'Get notified instantly when GuardIA flags an event', checked: true },
      { label: 'Auto-record on detection', desc: 'Save a clip automatically when an alert triggers', checked: true },
      { label: 'Night vision enhancement', desc: 'Apply low-light processing to camera feeds after hours', checked: false },
    ],
  },
  {
    icon: Bell,
    title: 'Notifications',
    rows: [
      { label: 'Email digests', desc: 'Daily summary of campus activity and attendance', checked: true },
      { label: 'SMS critical alerts', desc: 'Text message for high-severity GuardIA events only', checked: false },
    ],
  },
  {
    icon: Palette,
    title: 'Appearance',
    rows: [
      { label: 'Dark mode', desc: 'GuardIA is optimized for dark environments', checked: true },
      { label: 'Reduced motion', desc: 'Minimize animations across the platform', checked: false },
    ],
  },
];

export default function Settings() {
  const { user } = useAuth();

  return (
    <>
      <Topbar title="Settings" subtitle="Manage your account and platform preferences" />
      <PageTransition className="p-6 space-y-5 max-w-3xl">
        <GlassCard className="p-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/25 to-purple-500/25 text-xl font-bold text-cyan-200">
            {(user?.name || 'D').split(' ').map((p) => p[0]).slice(0, 2).join('')}
          </div>
          <div>
            <h2 className="font-display font-semibold text-white">{user?.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{user?.role} · U-IGNIS University</p>
          </div>
        </GlassCard>

        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * si }}
          >
            <GlassCard hover={false} className="p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <section.icon size={16} className="text-cyan-300" />
                <h3 className="font-display font-semibold text-white text-sm">{section.title}</h3>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {section.rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm text-slate-200">{row.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{row.desc}</p>
                    </div>
                    <Toggle defaultChecked={row.checked} />
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </PageTransition>
    </>
  );
}
