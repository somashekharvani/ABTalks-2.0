import React from 'react';
import { Flame, CheckCircle2, Clock, Snowflake, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StreakState } from '@/types';

interface SubmissionStatusProps {
  streakState: StreakState;
  currentStreak: number;
  freezesRemaining: number;
}

export function SubmissionStatus({ streakState, currentStreak, freezesRemaining }: SubmissionStatusProps) {
  return (
    <Card className="border-slate-800 bg-slate-950/40 p-4">
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          <span className="text-slate-300 font-medium">FSM Engine Status:</span>
          <Badge variant={streakState === 'FROZEN' ? 'blue' : streakState === 'BROKEN' ? 'purple' : 'amber'}>
            {streakState}
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-slate-400 font-medium">
          <span>Active Streak: <strong className="text-white font-mono">{currentStreak}d</strong></span>
          <span>Shields: <strong className="text-blue-400 font-mono">{freezesRemaining}</strong></span>
        </div>
      </div>
    </Card>
  );
}
