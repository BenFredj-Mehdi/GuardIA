import { Building2, Users, Clock } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function ClassroomCard({ room, delay = 0 }) {
  const pct = Math.round((room.occupancy / room.capacity) * 100);
  const level = pct >= 90 ? 'rose' : pct >= 60 ? 'amber' : 'emerald';
  const barColor = { rose: 'bg-rose-400', amber: 'bg-amber-400', emerald: 'bg-emerald-400' }[level];
  const badgeColor = {
    rose: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    amber: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    emerald: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  }[level];

  return (
    <GlassCard
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="p-5 flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-white text-sm">{room.name}</h3>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <Building2 size={12} />
            {room.building} · {room.floor}
          </p>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${badgeColor}`}>
          {room.type}
        </span>
      </div>

      <div className="mt-2 mb-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="flex items-center gap-1.5">
            <Users size={12} />
            Occupancy
          </span>
          <span className="text-slate-300 font-medium">
            {room.occupancy}/{room.capacity}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
          <div className={`h-full rounded-full ${barColor} transition-all duration-500`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-white/[0.06] space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Clock size={11} />
          Today's Schedule
        </p>
        {room.schedule.slice(0, 2).map((s, i) => (
          <div key={i} className="text-xs">
            <p className="text-slate-300">{s.course}</p>
            <p className="text-slate-600">
              {s.time} · {s.instructor}
            </p>
          </div>
        ))}
        {room.schedule.length === 0 && <p className="text-xs text-slate-600">No sessions scheduled.</p>}
      </div>
    </GlassCard>
  );
}
