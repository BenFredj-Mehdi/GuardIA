import { motion } from 'framer-motion';
import { ShieldCheck, Wind, AlertOctagon, ArrowUpRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const severityStyles = {
  yellow: {
    icon: Wind,
    iconWrap: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
    border: 'border-amber-400/25 hover:border-amber-400/50',
    dot: 'bg-amber-400',
  },
  red: {
    icon: AlertOctagon,
    iconWrap: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    border: 'border-rose-500/25 hover:border-rose-500/50',
    dot: 'bg-rose-500',
  },
};

/**
 * Real-time alert feed. Each entry links back to the camera that
 * triggered it — selecting one expands that tile in the grid above.
 */
export default function AlertsPanel({ alerts = [], onSelect, activeCameraId }) {
  return (
    <GlassCard hover={false} className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-white text-sm">Recent Alerts</h2>
        <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-slate-400">
          {alerts.length}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 border border-emerald-400/20">
            <ShieldCheck size={20} className="text-emerald-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-300">No active alerts</p>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
              GuardIA is monitoring all 8 zones. Detected events will appear here in real time.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5 overflow-y-auto">
          {alerts.map((alert, i) => {
            const style = severityStyles[alert.severity] || severityStyles.red;
            const Icon = style.icon;
            const isActive = activeCameraId === alert.cameraId;
            return (
              <motion.button
                key={alert.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                onClick={() => onSelect?.(alert.cameraId)}
                className={`group w-full rounded-xl border bg-white/[0.03] p-3 text-left transition-colors ${style.border} ${
                  isActive ? 'ring-1 ring-white/30' : ''
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${style.iconWrap}`}>
                    <Icon size={13} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot} animate-pulse-dot`} />
                      <p className="text-xs font-semibold text-slate-100 truncate">{alert.label}</p>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {alert.location} · {alert.time}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={13}
                    className="mt-0.5 shrink-0 text-slate-600 transition-colors group-hover:text-slate-300"
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
