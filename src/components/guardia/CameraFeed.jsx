import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Maximize2, Wifi } from 'lucide-react';
import AlertOverlay from './AlertOverlay';

/**
 * Isolated camera tile. Pass a real stream/video URL via `source` later
 * (e.g. a looping .mp4) — the placeholder scanning state disappears
 * automatically and a <video> element renders in its place.
 */
export default function CameraFeed({
  id,
  location,
  zone,
  source = null,
  status = 'online',
  alerts = [],
  delay = 0,
}) {
  const [expanded, setExpanded] = useState(false);
  const isOnline = status === 'online';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group relative aspect-video overflow-hidden rounded-xl border border-white/[0.07] bg-black shadow-glow"
    >
      {source ? (
        <video
          src={source}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-[#020203] to-[#050608]">
          <div className="absolute inset-0 opacity-[0.15] grid-bg" />
          {isOnline && (
            <motion.div
              className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
              animate={{ top: ['-20%', '110%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay }}
            />
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Video size={22} className="text-white/10" strokeWidth={1.5} />
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/15">
              {isOnline ? 'Awaiting Feed' : 'No Signal'}
            </p>
          </div>
        </div>
      )}

      <AlertOverlay alerts={alerts} />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
        <div className="flex items-center gap-1.5 rounded-md bg-black/50 backdrop-blur-sm px-2 py-1">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isOnline ? 'bg-rose-500 animate-pulse-dot' : 'bg-slate-600'
            }`}
          />
          <span className="text-[10px] font-semibold tracking-wider text-white/90">
            {isOnline ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="rounded-md bg-black/50 backdrop-blur-sm p-1.5 text-white/60 opacity-0 transition-opacity group-hover:opacity-100 hover:text-white"
        >
          <Maximize2 size={12} />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{location}</p>
            {zone && <p className="text-[10px] text-white/40">{zone}</p>}
          </div>
          <div className="flex items-center gap-1 text-white/40">
            <Wifi size={11} />
            <span className="text-[9px]">{id}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
