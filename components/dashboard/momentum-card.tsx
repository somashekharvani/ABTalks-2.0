import React from 'react';
import { TrendingUp, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MomentumScore } from '@/types';

interface MomentumCardProps {
  momentum: MomentumScore;
}

export function MomentumCard({ momentum }: MomentumCardProps) {
  const isPositive = momentum.delta >= 0;

  return (
    <Card className="relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-purple-950/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Momentum Score</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold text-white tracking-tight">{momentum.value}</span>
            <span className="text-xs font-semibold text-slate-400">/100</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ml-2 ${
                isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}
            >
              <TrendingUp className={`w-3 h-3 ${!isPositive && 'rotate-180'}`} />
              {isPositive ? `+${momentum.delta}` : momentum.delta}
            </span>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
          <Zap className="w-6 h-6 animate-pulse text-purple-400" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-purple-300 font-semibold">{momentum.tier}</span>
          <span className="text-slate-400">{momentum.value}% Velocity</span>
        </div>
        <Progress value={momentum.value} barClassName="from-purple-500 via-amber-500 to-orange-500" />
        <p className="text-[11px] text-slate-400 leading-normal pt-1">{momentum.description}</p>
      </div>
    </Card>
  );
}
