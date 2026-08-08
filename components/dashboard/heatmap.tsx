'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, Linkedin, ShieldCheck, Snowflake, Flame, ArrowRight, X, Calendar, Lock, AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeatmapCell } from '@/types';
import { TASKS } from '@/data/tasks';
import { cn } from '@/lib/utils';

interface HeatmapProps {
  cells: HeatmapCell[];
  currentDay: number;
  onSelectDay?: (day: number) => void;
}

export function Heatmap({ cells, currentDay, onSelectDay }: HeatmapProps) {
  const [selectedCellDay, setSelectedCellDay] = useState<number | null>(null);

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

  const handleCellClick = (day: number) => {
    setSelectedCellDay(day);
    if (onSelectDay) {
      onSelectDay(day);
    }
  };

  const selectedCell = cells.find((c) => c.day === selectedCellDay);
  const selectedTask = selectedCellDay ? TASKS.find((t) => t.day === selectedCellDay) : null;

  return (
    <>
      <Card className="border-slate-800/80">
        <CardHeader className="mb-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>60-Day Submission Heatmap & Historical Day Inspector</span>
              <span className="text-xs font-normal text-slate-400">Day {currentDay} of 60</span>
            </CardTitle>
            <CardDescription>Click any day cell to inspect detailed challenge record, state transitions, proof links, and snapshot telemetry</CardDescription>
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
        <div className="grid grid-cols-10 sm:grid-cols-12 gap-1.5 p-2 bg-slate-950/50 rounded-xl border border-slate-800/50">
          {cells.map((cell) => (
            <Tooltip key={cell.day} content={cell.tooltip}>
              <div
                onClick={() => handleCellClick(cell.day)}
                className={cn(
                  'aspect-square rounded-md border text-[10px] font-mono flex items-center justify-center transition-all duration-150 cursor-pointer hover:scale-115 active:scale-95 select-none relative',
                  getCellColor(cell.status),
                  selectedCellDay === cell.day && 'ring-2 ring-white scale-110 z-10'
                )}
              >
                {cell.day}
              </div>
            </Tooltip>
          ))}
        </div>
      </Card>

      {/* Selected Day Inspector Modal */}
      {selectedCellDay && selectedCell && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedCellDay(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <Badge variant={selectedCell.status === 'verified' ? 'green' : selectedCell.status === 'frozen' ? 'blue' : selectedCell.status === 'missed' ? 'red' : 'amber'}>
                DAY {selectedCell.day} INSPECTOR
              </Badge>
              <Badge variant="outline">{selectedCell.status.toUpperCase()}</Badge>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">{selectedTask.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedTask.description}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>Category: <strong className="text-slate-200">{selectedTask.category}</strong></span>
                <span>Difficulty: <strong className="text-slate-200">{selectedTask.difficulty}</strong></span>
              </div>

              {selectedCell.status === 'verified' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Challenge Proof Status:
                    </span>
                    <span className="text-emerald-400 font-bold">✓ Verified</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-white" /> GitHub Repository:
                    </span>
                    <a
                      href={`https://github.com/abtalks-student/day-${selectedCell.day}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      github.com/day-{selectedCell.day} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn Post:
                    </span>
                    <a
                      href={`https://linkedin.com/posts/day-${selectedCell.day}-completed`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      linkedin.com/day-{selectedCell.day} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {selectedCell.status === 'frozen' && (
                <div className="space-y-1.5 text-blue-300">
                  <div className="flex items-center gap-2 font-bold">
                    <Snowflake className="w-4 h-4 text-blue-400" />
                    <span>STATE: FROZEN</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    EVENT: Tactical Shield consumed on Day {selectedCell.day}. Streak preserved at {selectedCell.day} days.
                  </p>
                </div>
              )}

              {selectedCell.status === 'missed' && (
                <div className="space-y-1.5 text-rose-300">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>STATE: BROKEN</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    IMPACT: Missed submission window without available freeze. Streak reset.
                  </p>
                  <p className="text-[11px] text-purple-300 font-semibold">
                    RECOVERY: Non-punitive Recovery Path available.
                  </p>
                </div>
              )}

              {selectedCell.status === 'future' && (
                <div className="space-y-1 text-slate-400">
                  <div className="flex items-center gap-2 font-bold text-slate-300">
                    <Lock className="w-4 h-4 text-slate-500" />
                    <span>DAY {selectedCell.day} · LOCKED</span>
                  </div>
                  <p className="text-[11px]">
                    Available in {selectedCell.day - currentDay} days. Complete active challenges to unlock.
                  </p>
                </div>
              )}

              {selectedCell.status === 'today' && (
                <div className="space-y-1 text-amber-300">
                  <div className="flex items-center gap-2 font-bold">
                    <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>TODAY'S ACTIVE CHALLENGE</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Ready to submit! Submit code proof before midnight to maintain momentum.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedCellDay(null)}>
                Close Inspector
              </Button>
              {selectedCell.status === 'missed' ? (
                <Link href={`/day/${selectedCell.day}`}>
                  <Button size="sm" variant="primary" className="font-bold gap-1 bg-purple-600 hover:bg-purple-500 text-white">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Begin Recovery</span>
                  </Button>
                </Link>
              ) : (
                <Link href={`/day/${selectedCell.day}`}>
                  <Button size="sm" className="font-bold gap-1">
                    <span>Open Day {selectedCell.day} Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
