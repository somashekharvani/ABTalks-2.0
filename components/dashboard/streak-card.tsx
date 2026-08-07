import React from 'react';
import { Flame, Snowflake, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardViewModel } from '@/types';

interface StreakCardProps {
  streak: DashboardViewModel['streak'];
}

export function StreakCard({ streak }: StreakCardProps) {
  const getBadgeVariant = () => {
    if (streak.state === 'FROZEN') return 'blue';
    if (streak.state === 'BROKEN' || streak.recoveryActive) return 'purple';
    if (streak.isAtRisk) return 'amber';
    return 'amber';
  };

  return (
    <Card className="relative overflow-hidden group border-amber-500/20 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-amber-950/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Current Streak</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold text-white tracking-tight">{streak.currentStreak}</span>
            <span className="text-sm font-semibold text-slate-400">days</span>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-105 transition-transform duration-300">
          <Flame className="w-6 h-6 animate-pulse text-orange-400" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <Badge variant={getBadgeVariant()}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          <span>{streak.state.replace('_', ' ')}</span>
        </Badge>

        <div className="flex items-center gap-3 text-slate-400">
          <div className="flex items-center gap-1" title="Longest streak">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Best: <strong className="text-slate-200">{streak.longestStreak}d</strong></span>
          </div>
          <div className="flex items-center gap-1" title="Freezes remaining">
            <Snowflake className="w-3.5 h-3.5 text-blue-400" />
            <span>Freezes: <strong className="text-slate-200">{streak.freezesRemaining}</strong></span>
          </div>
        </div>
      </div>
    </Card>
  );
}
