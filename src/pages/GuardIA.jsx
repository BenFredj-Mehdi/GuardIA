import { ShieldHalf, Cpu, Activity } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import PageTransition from '../components/ui/PageTransition';
import CameraFeed from '../components/guardia/CameraFeed';
import AlertsPanel from '../components/guardia/AlertsPanel';
import GlassCard from '../components/ui/GlassCard';
import cameras from '../data/cameras.json';

export default function GuardIA() {
  const onlineCount = cameras.filter((c) => c.status === 'online').length;

  return (
    <>
      <Topbar title="GuardIA Command Center" subtitle="AI-powered campus security monitoring" />
      <PageTransition className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <ShieldHalf size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Cameras Online</p>
              <p className="text-sm font-semibold text-white">{onlineCount} / {cameras.length}</p>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-300">
              <Cpu size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Detection Models</p>
              <p className="text-sm font-semibold text-white">Not Connected</p>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
              <Activity size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500">System Status</p>
              <p className="text-sm font-semibold text-white">Monitoring Active</p>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cameras.map((cam, i) => (
                <CameraFeed
                  key={cam.id}
                  id={cam.id}
                  location={cam.location}
                  zone={cam.zone}
                  source={cam.source}
                  status={cam.status}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>

          <div className="xl:col-span-1">
            <AlertsPanel alerts={[]} />
          </div>
        </div>
      </PageTransition>
    </>
  );
}
