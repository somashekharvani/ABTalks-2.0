import React from 'react';
import { Trophy, Rocket, Flame, Snowflake, ShieldCheck, RefreshCw, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Achievement } from '@/types';
import { cn } from '@/lib/utils';

interface AchievementsGridProps {
  achievements: Achievement[];
}

const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Snowflake: <Snowflake className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  RefreshCw: <RefreshCw className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
};

export function AchievementsGrid({ achievements }: AchievementsGridProps) {
  return (
    <Card className="border-slate-800/80">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Achievement Badges</span>
          </CardTitle>
          <CardDescription>Milestones unlocked through continuous engineering discipline</CardDescription>
        </div>
      </CardHeader>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              'p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between',
              badge.unlocked
                ? 'bg-slate-800/60 border-amber-500/30 shadow-lg shadow-amber-500/5 hover:border-amber-400/50'
                : 'bg-slate-900/30 border-slate-800/50 opacity-50 grayscale'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={cn(
                  'p-2 rounded-lg',
                  badge.unlocked ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-800 text-slate-500'
                )}
              >
                {iconMap[badge.icon] || <Trophy className="w-5 h-5" />}
              </div>
              {badge.unlocked ? (
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {badge.unlockedAt || 'Unlocked'}
                </span>
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              )}
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-200">{badge.title}</h5>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">{badge.description}</p>
              <span className="text-[10px] text-slate-500 font-mono mt-2 block pt-1 border-t border-slate-800/50">
                Criteria: {badge.criteria}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
