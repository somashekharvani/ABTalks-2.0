'use client';

import React from 'react';
import { Activity, CheckCircle2, Snowflake, RefreshCw, Flag } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ActivityLogItem } from '@/types';

interface ActivityFeedProps {
  items: ActivityLogItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  const getIcon = (type: ActivityLogItem['type']) => {
    switch (type) {
      case 'submission':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'freeze':
        return <Snowflake className="w-4 h-4 text-blue-400" />;
      case 'recovery':
        return <RefreshCw className="w-4 h-4 text-purple-400" />;
      case 'milestone':
      default:
        return <Flag className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <Card className="border-slate-800 bg-slate-900/80">
      <CardHeader>
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Activity Feed & Logs</span>
          </CardTitle>
          <CardDescription>Real-time audit trail of challenge submissions and FSM updates</CardDescription>
        </div>
      </CardHeader>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.id} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
              {getIcon(item.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-200">{item.title}</h5>
                <span className="text-[10px] font-mono text-slate-500">{item.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
