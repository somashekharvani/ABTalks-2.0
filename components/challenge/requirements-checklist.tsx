'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, ListChecks } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface RequirementsChecklistProps {
  requirements: string[];
}

export function RequirementsChecklist({ requirements }: RequirementsChecklistProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <Card className="border-slate-800">
      <CardHeader>
        <div>
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-amber-400" />
              <span>Technical Acceptance Checklist</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              {completedCount} / {requirements.length} Completed
            </span>
          </CardTitle>
          <CardDescription>Verify all technical constraints before submitting code proof</CardDescription>
        </div>
      </CardHeader>

      <div className="space-y-2">
        {requirements.map((req, idx) => {
          const isDone = !!checked[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 select-none ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <span className={`text-xs leading-relaxed font-medium ${isDone && 'line-through text-slate-400'}`}>
                {req}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
