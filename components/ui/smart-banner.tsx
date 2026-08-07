import React from 'react';
import { Snowflake, RefreshCw, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DashboardViewModel } from '@/types';

interface SmartBannerProps {
  streak: DashboardViewModel['streak'];
  onActionClick?: () => void;
}

export function SmartBanner({ streak, onActionClick }: SmartBannerProps) {
  if (streak.state === 'FROZEN' || streak.freezeUsedToday) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900 to-blue-900/40 p-4 shadow-lg shadow-blue-500/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Snowflake className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-blue-200">Freeze Used Today</h4>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">Tactical Shield Active</span>
            </div>
            <p className="text-xs text-blue-300/80 mt-0.5">
              You missed a day, but your <strong>{streak.currentStreak}-day streak</strong> is preserved! {streak.freezesRemaining} freeze remaining.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (streak.recoveryActive || streak.state === 'BROKEN') {
    const msg = streak.recoveryMessage;
    return (
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/60 via-slate-900 to-purple-900/40 p-5 shadow-lg shadow-purple-500/10 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0 mt-0.5 sm:mt-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">Recovery Mode</span>
                <span className="text-xs text-purple-300/90 font-medium">🔥 Previous Best: {msg?.previousBest || 18} Days</span>
              </div>
              <h4 className="text-base font-bold text-white mt-1">{msg?.headline || 'Welcome back.'}</h4>
              <p className="text-xs text-purple-200/80 mt-1 max-w-xl">
                {msg?.quote || "Every great developer has missed a day. Let's build your next streak."}
              </p>
              <div className="mt-2 text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                <span>🎯 Goal:</span>
                <span>{msg?.targetGoal || 'Beat your personal record.'}</span>
              </div>
            </div>
          </div>
          {onActionClick && (
            <button
              onClick={onActionClick}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl bg-purple-500 text-white hover:bg-purple-400 transition-colors shrink-0 shadow-lg shadow-purple-500/20"
            >
              Start Recovery Submit →
            </button>
          )}
        </div>
      </div>
    );
  }

  if (streak.isAtRisk) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-900/40 p-4 shadow-lg shadow-amber-500/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Flame className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-amber-200">Streak At Risk!</h4>
            <p className="text-xs text-amber-300/80 mt-0.5">
              Submit today’s challenge before midnight to protect your active <strong>{streak.currentStreak}-day streak</strong>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
