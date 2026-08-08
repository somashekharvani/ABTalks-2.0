'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, Linkedin, ShieldCheck, Snowflake, Flame, ArrowRight, X, Calendar, Play, Code2, BookOpen, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SaaSVideoPlayer } from '@/components/ui/saas-video-player';
import { downloadPdfNotes } from '@/lib/export-pdf';
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
              <span>60-Day Submission Heatmap</span>
              <span className="text-xs font-normal text-slate-400">Day {currentDay} of 60</span>
            </CardTitle>
            <CardDescription>Click any past or active day cell to open the day's technical notes, PDF export, video class, and score record</CardDescription>
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

      {/* Day Inspector Modal with Video Player, Notes PDF Export, Code Example, & Score */}
      {selectedCellDay && selectedCell && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedCellDay(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={selectedCell.status === 'verified' ? 'green' : selectedCell.status === 'frozen' ? 'blue' : 'amber'}>
                Day {selectedCell.day} Record
              </Badge>
              <Badge variant="default">{selectedTask.category}</Badge>
              <Badge variant="purple">{selectedTask.difficulty}</Badge>
              <Badge variant="outline" className="ml-auto font-mono text-amber-400">
                Score: {selectedTask.score}/100 ⭐
              </Badge>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">{selectedTask.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedTask.description}</p>
            </div>

            {/* Guaranteed Active Video Player */}
            <SaaSVideoPlayer
              title={selectedTask.videoTitle}
              duration={selectedTask.videoDuration}
              youtubeUrl={selectedTask.videoClassUrl}
            />

            {/* Technical Notes Section with PDF Export */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Technical Lecture Notes
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadPdfNotes(selectedTask)}
                  className="text-[10px] font-bold gap-1 border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
                >
                  <Download className="w-3 h-3" />
                  <span>Export PDF Notes</span>
                </Button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedTask.notes}</p>
            </div>

            {/* Code Example Section */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Code2 className="w-3.5 h-3.5 text-blue-400" /> Day-Specific Code Example
              </h4>
              <pre className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{selectedTask.codeExample}</code>
              </pre>
            </div>

            {/* Verified Submissions & Proof Links */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Proof of Work Submission Status
              </h4>

              {selectedCell.status === 'verified' ? (
                <div className="space-y-2 pt-1 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-white" /> Repository Proof:
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
              ) : selectedCell.status === 'frozen' ? (
                <div className="pt-2 border-t border-slate-800 text-blue-300 flex items-center gap-2">
                  <Snowflake className="w-4 h-4 text-blue-400" />
                  <span>Missed day protected by Tactical Freeze shield. Streak preserved at 11 days.</span>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-800 text-amber-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Challenge ready to be completed and submitted.</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedCellDay(null)}>
                Close Record
              </Button>
              <Link href={`/day/${selectedCell.day}`}>
                <Button size="sm" className="font-bold gap-1">
                  <span>Open Day {selectedCell.day} Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
