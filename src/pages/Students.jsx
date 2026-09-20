import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import PageTransition from '../components/ui/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import StudentDetailModal from '../components/students/StudentDetailModal';
import studentsData from '../data/students.json';

const classes = ['All Classes', ...new Set(studentsData.map((s) => s.class))];

export default function Students() {
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return studentsData.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase().includes(query.toLowerCase());
      const matchesClass = classFilter === 'All Classes' || s.class === classFilter;
      return matchesQuery && matchesClass;
    });
  }, [query, classFilter]);

  return (
    <>
      <Topbar title="Students" subtitle={`${studentsData.length} enrolled students across campus`} />
      <PageTransition className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or student ID..."
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-400/50 focus:bg-white/[0.05]"
            />
          </div>
          <div className="relative">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-4 pr-9 text-sm text-white outline-none transition-colors focus:border-cyan-400/50 cursor-pointer"
            >
              {classes.map((c) => (
                <option key={c} value={c} className="bg-base-900">
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        <GlassCard hover={false} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5 font-medium">Student</th>
                  <th className="px-5 py-3.5 font-medium hidden sm:table-cell">ID</th>
                  <th className="px-5 py-3.5 font-medium hidden md:table-cell">Class</th>
                  <th className="px-5 py-3.5 font-medium">Attendance</th>
                  <th className="px-5 py-3.5 font-medium hidden lg:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    onClick={() => setSelected(s)}
                    className="cursor-pointer border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-xs font-semibold text-cyan-200 shrink-0">
                          {s.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-200 truncate">{s.name}</p>
                          <p className="text-xs text-slate-500 truncate">{s.major}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 hidden sm:table-cell">{s.id}</td>
                    <td className="px-5 py-3.5 text-slate-400 hidden md:table-cell">{s.class}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              s.attendance < 80 ? 'bg-rose-400' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${s.attendance}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">{s.attendance}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          s.status === 'Active'
                            ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20'
                            : 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-sm text-slate-500">No students match your search.</div>
            )}
          </div>
        </GlassCard>
      </PageTransition>

      <StudentDetailModal student={selected} onClose={() => setSelected(null)} />
    </>
  );
}
