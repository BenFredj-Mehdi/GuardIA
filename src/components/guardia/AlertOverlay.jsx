import { motion } from 'framer-motion';
import { Wind, AlertOctagon } from 'lucide-react';

const severityStyles = {
  yellow: {
    wash: 'rgba(234,179,8,0.28)',
    ring: 'ring-amber-400/70',
    badgeBg: 'bg-amber-400 text-amber-950',
    icon: Wind,
  },
  red: {
    wash: 'rgba(244,63,94,0.32)',
    ring: 'ring-rose-500/70',
    badgeBg: 'bg-rose-500 text-white',
    icon: AlertOctagon,
  },
};

/**
 * Renders the active AI-detection overlay on a camera tile: a flashing
 * color wash, pulsing ring, and an "ALERT: <label>" badge. Wire real
 * detections through the `alert` prop — e.g.
 * { type: 'fire'|'fall'|'fight'|'gas', label, severity: 'yellow'|'red' }.
 * Renders nothing when there is no active alert.
 */
export default function AlertOverlay({ alert }) {
  if (!alert) return null;
  const style = severityStyles[alert.severity] || severityStyles.red;
  const Icon = style.icon;

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ backgroundColor: style.wash }}
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`pointer-events-none absolute inset-0 z-10 rounded-xl ring-2 ${style.ring}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-md px-2 py-1 shadow-lg ${style.badgeBg}`}
        animate={{ opacity: [1, 0.55, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon size={12} strokeWidth={2.5} />
        <span className="text-[10px] font-bold tracking-wider">
          ALERT: {alert.label.toUpperCase()}
        </span>
      </motion.div>
    </>
  );
}
