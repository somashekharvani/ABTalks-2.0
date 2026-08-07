import React from 'react';
import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface WeeklyInsightCardProps {
  insight: string;
}

export function WeeklyInsightCard({ insight }: WeeklyInsightCardProps) {
  return (
    <Card className="border-blue-500/20 bg-gradient-to-r from-slate-900 via-slate-900/80 to-blue-950/20 p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Weekly AI Insight</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{insight}</p>
        </div>
      </div>
    </Card>
  );
}
