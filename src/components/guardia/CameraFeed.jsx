import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Maximize2, Minimize2, Wifi } from 'lucide-react';
import AlertOverlay from './AlertOverlay';

/**
 * Isolated camera tile. `source` accepts an image or looping/one-shot
 * video URL, `mediaType` picks the renderer, and `alert` (optional)
 * drives the flashing detection overlay from AlertOverlay.
 */
export default function CameraFeed({
  id,
  location,
  zone,
  mediaType = 'image',
  source = null,
  status = 'online',
  alert = null,
  expanded = false,
  onToggleExpand,
  delay = 0,
}) {
  const [videoEnded, setVideoEnded] = useState(false);
  const isOnline = status === 'online';

  const numericId = parseInt(id.replace(/\D/g, ''), 10) || 0;
  const kenBurnsDuration = 14 + (numericId % 4) * 3;

  const showEndImage = mediaType === 'video' && alert?.endImage && videoEnded;
  const severityRing =
    alert?.severity === 'red'
      ? 'border-rose-500/50'
      : alert?.severity === 'yellow'
      ? 'border-amber-400/50'
      : 'border-white/[0.07]';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        default: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
        layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`group relative overflow-hidden rounded-xl border bg-black shadow-glow ${severityRing} ${
        expanded ? 'sm:col-span-2 row-span-2 min-h-[320px] sm:min-h-[420px]' : 'aspect-video'
      }`}
    >
      {mediaType === 'video' && source && !showEndImage ? (
        <video
          key={source}
          src={source}
          autoPlay
          muted
          loop={alert?.loop ?? true}
          playsInline
          onEnded={() => setVideoEnded(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : mediaType === 'image' && source ? (
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={showEndImage ? alert.endImage : source}
            alt={location}
            className="h-full w-full object-cover"
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: kenBurnsDuration, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      ) : mediaType === 'video' && showEndImage ? (
        <img src={alert.endImage} alt={location} className="absolute inset-0 h-full w-full object-cover" />
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

      <AlertOverlay alert={alert} />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 z-20">
        {!alert && (
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
        )}
        <button
          onClick={onToggleExpand}
          className="ml-auto rounded-md bg-black/50 backdrop-blur-sm p-1.5 text-white/60 opacity-0 transition-opacity group-hover:opacity-100 hover:text-white"
        >
          {expanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6 z-20">
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
