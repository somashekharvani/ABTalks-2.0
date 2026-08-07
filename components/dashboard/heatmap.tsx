import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { HeatmapCell } from '@/types';
import { cn } from '@/lib/utils';

interface HeatmapProps {
  cells: HeatmapCell[];
  currentDay: number;
}

export function Heatmap({ cells, currentDay }: HeatmapProps) {
  const getCellColor = (status: HeatmapCell['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-500 border-emerald-400/60 text-black shadow-emerald-500/20';
      case 'submitted':
        return 'bg-amber-500 border-amber-400/60 text-black shadow-amber-500/20';
      case 'frozen':
        return 'bg-blue-500 border-blue-400/60 text-white shadow-blue-500/20';
      case 'missed':
        return 'bg-rose-950/40 border-rose-900/60 text-rose-400/60';
      case 'today':
        return 'bg-amber-500/20 border-2 border-amber-400 text-amber-300 animate-pulse';
      case 'future':
      default:
        return 'bg-slate-800/40 border-slate-800 text-slate-600';
    }
  };

  return (
    <Card className="border-slate-800/80">
      <CardHeader className="mb-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <span>60-Day Submission Heatmap</span>
            <span className="text-xs font-normal text-slate-400">Day {currentDay} of 60</span>
          </CardTitle>
          <CardDescription>Dynamic consistency record updated in real-time</CardDescription>
        </div>

        {/* Heatmap Legend */}
        <div className="flex items-center gap-2.5 text-[10px] text-slate-400 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span>Verified</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
            <span>Frozen</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/20 border border-amber-400" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-950/40 border border-rose-900" />
            <span>Missed</span>
          </div>
        </div>
      </CardHeader>

      {/* Grid Container */}
      <div className="grid grid-cols-10 sm:grid-cols-12 gap-1.5 p-1 bg-slate-950/50 rounded-xl border border-slate-800/50">
        {cells.map((cell) => (
          <Tooltip key={cell.day} content={cell.tooltip}>
            <div
              className={cn(
                'aspect-square rounded-md border text-[10px] font-mono flex items-center justify-center transition-all duration-150 cursor-pointer hover:scale-110 select-none',
                getCellColor(cell.status)
              )}
            >
              {cell.day}
            </div>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
}
