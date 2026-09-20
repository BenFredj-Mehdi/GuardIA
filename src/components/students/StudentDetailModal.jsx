import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';

export default function StudentDetailModal({ student, onClose }) {
  return (
    <AnimatePresence>
      {student && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel w-full max-w-md p-6 bg-base-900/95"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/25 to-purple-500/25 text-lg font-bold text-cyan-200">
                  {student.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">{student.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{student.id}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <DetailRow icon={Mail} label="Email" value={student.email} />
              <DetailRow icon={GraduationCap} label="Major" value={student.major} />
              <DetailRow icon={BookOpen} label="Class" value={`${student.class} · ${student.year}`} />
              <DetailRow
                icon={TrendingUp}
                label="Attendance"
                value={
                  <span className={student.attendance < 80 ? 'text-rose-300' : 'text-emerald-300'}>
                    {student.attendance}%
                  </span>
                }
              />
            </div>

            <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-slate-500">Status</span>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  student.status === 'Active'
                    ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20'
                    : 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                }`}
              >
                {student.status}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.05] px-3.5 py-2.5">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Icon size={13} />
        {label}
      </div>
      <span className="text-xs font-medium text-slate-200">{value}</span>
    </div>
  );
}
