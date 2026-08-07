import React from 'react';
import { Flag, Award, Snowflake, RefreshCw, Milestone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { JourneyEvent } from '@/types';
import { cn } from '@/lib/utils';

interface JourneyTimelineProps {
  events: JourneyEvent[];
}

const typeIconMap: Record<string, React.ReactNode> = {
  joined: <Flag className="w-4 h-4 text-emerald-400" />,
  badge: <Award className="w-4 h-4 text-amber-400" />,
  freeze: <Snowflake className="w-4 h-4 text-blue-400" />,
  recovery: <RefreshCw className="w-4 h-4 text-purple-400" />,
  milestone: <Milestone className="w-4 h-4 text-slate-300" />,
};

export function JourneyTimeline({ events }: JourneyTimelineProps) {
  return (
    <Card className="border-slate-800/80">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <Milestone className="w-5 h-5 text-amber-400" />
            <span>Journey Timeline</span>
          </CardTitle>
          <CardDescription>Automated record of milestones, shields, and momentum events</CardDescription>
        </div>
      </CardHeader>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-blue-500 before:to-slate-800">
        {events.map((evt, idx) => (
          <div key={evt.id || idx} className="relative group">
            <div
              className={cn(
                'absolute -left-6 top-0.5 w-5 h-5 rounded-full border flex items-center justify-center bg-slate-900 shadow-md transition-transform group-hover:scale-110',
                evt.type === 'joined' && 'border-emerald-500 text-emerald-400',
                evt.type === 'badge' && 'border-amber-500 text-amber-400',
                evt.type === 'freeze' && 'border-blue-500 text-blue-400',
                evt.type === 'recovery' && 'border-purple-500 text-purple-400',
                evt.type === 'milestone' && 'border-slate-600 text-slate-400'
              )}
            >
              {typeIconMap[evt.type] || <Milestone className="w-3 h-3" />}
            </div>

            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <h5 className="text-xs font-bold text-slate-200">{evt.title}</h5>
                <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 bg-slate-800/50 rounded-full">{evt.date}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-snug">{evt.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
