'use client';

import React from 'react';
import { History, Calendar, RotateCcw, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeMachineProps {
  currentDay: number;
  viewDay: number;
  isSnapshotMode: boolean;
  onSelectDay: (day: number) => void;
  onResetToCurrentDay: () => void;
}

export function TimeMachineController({
  currentDay,
  viewDay,
  isSnapshotMode,
  onSelectDay,
  onResetToCurrentDay,
}: TimeMachineProps) {
  const pastDays = Array.from({ length: currentDay }, (_, i) => i + 1);

  return (
    <Card className={cn('p-4 transition-all duration-300', isSnapshotMode ? 'border-purple-500/50 bg-purple-950/20' : 'border-slate-800 bg-slate-900/60')}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn('p-2.5 rounded-xl border shrink-0', isSnapshotMode ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-400')}>
            <History className={cn('w-5 h-5', isSnapshotMode && 'animate-spin')} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Time Machine Snapshot Mode</span>
                {isSnapshotMode && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500 text-white animate-pulse">
                    Rewound to Day {viewDay}
                  </span>
                )}
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any past day to rewind the dashboard state, streak FSM, momentum, and AI insights back to that exact point in time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-between">
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-950/80 rounded-xl border border-slate-800 max-w-full">
            {pastDays.map((day) => {
              const isSelected = viewDay === day;
              return (
                <button
                  key={day}
                  onClick={() => onSelectDay(day)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all select-none',
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  )}
                >
                  D{day}
                </button>
              );
            })}
          </div>

          {isSnapshotMode && (
            <Button size="sm" variant="secondary" onClick={onResetToCurrentDay} className="shrink-0 text-xs font-bold gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> Live Day {currentDay}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
