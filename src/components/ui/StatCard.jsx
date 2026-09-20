import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const glowMap = {
  cyan: 'shadow-glow-cyan text-cyan-300 bg-cyan-400/10',
  blue: 'shadow-glow-blue text-blue-300 bg-blue-400/10',
  purple: 'shadow-glow-purple text-purple-300 bg-purple-400/10',
  red: 'shadow-glow-red text-rose-300 bg-rose-400/10',
};

export default function StatCard({ icon: Icon, label, value, trend, glow = 'cyan', delay = 0 }) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold font-display text-white">{value}</p>
          {trend && (
            <p className="mt-1.5 text-xs text-slate-400">
              <span className={trend.positive ? 'text-emerald-400' : 'text-rose-400'}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>{' '}
              {trend.label}
            </p>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${glowMap[glow]}`}>
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
    </GlassCard>
  );
}
