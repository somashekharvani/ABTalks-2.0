'use client';

import React from 'react';
import { Dna, ShieldCheck, Zap, Target, RefreshCw, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ConsistencyDNA } from '@/types';

interface ConsistencyDNAProps {
  dna: ConsistencyDNA;
}

export function ConsistencyDNACard({ dna }: ConsistencyDNAProps) {
  const metrics = [
    { label: 'Discipline', value: dna.discipline, icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'Velocity', value: dna.velocity, icon: <Zap className="w-3.5 h-3.5 text-purple-400" /> },
    { label: 'Focus', value: dna.focus, icon: <Target className="w-3.5 h-3.5 text-blue-400" /> },
    { label: 'Recovery Capacity', value: dna.recovery, icon: <RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> },
    { label: 'Reliability', value: dna.reliability, icon: <Award className="w-3.5 h-3.5 text-orange-400" /> },
  ];

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Dna className="w-5 h-5 text-purple-400 animate-pulse" />
              <span>Consistency DNA 🧬</span>
            </CardTitle>
            <CardDescription>Algorithmic behavioral profile derived from engineering habits</CardDescription>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black">
            {dna.archetype}
          </span>
        </div>
      </CardHeader>

      <div className="space-y-3">
        <p className="text-xs text-slate-300 italic p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          "{dna.summary}"
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  {m.icon} {m.label}
                </span>
                <span className="text-slate-100 font-mono font-bold">{m.value}%</span>
              </div>
              <Progress value={m.value} className="h-1.5" barClassName="from-purple-500 to-amber-500" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
