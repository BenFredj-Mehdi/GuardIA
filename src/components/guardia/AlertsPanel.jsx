import { ShieldCheck } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

/**
 * Ready to receive real-time alerts once AI inference is wired up.
 * Feed it objects like:
 * { id, severity: 'critical'|'warning'|'info', type: 'fire'|'fall'|'fight'|'intrusion',
 *   location, time, snapshot }
 */
export default function AlertsPanel({ alerts = [] }) {
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
          {alerts.map((alert) => (
            <div key={alert.id} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="text-xs font-medium text-slate-200">{alert.type}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {alert.location} · {alert.time}
              </p>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
