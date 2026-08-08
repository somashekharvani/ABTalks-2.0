'use client';

import React, { useState } from 'react';
import { Terminal, Play, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw, Cpu, HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StreakState } from '@/types';
import { transitionStateTable, FSMReasonExplainer } from '@/lib/fsm-table';

export function FSMPlayground() {
  const [currentState, setCurrentState] = useState<StreakState>('AT_RISK');
  const [event, setEvent] = useState<'SUBMIT' | 'DAY_MISSED' | 'WINDOW_WARNING' | 'RECOVERY_SUBMIT'>('DAY_MISSED');
  const [hasFreeze, setHasFreeze] = useState<boolean>(true);
  const [lastResult, setLastResult] = useState<{
    previousState: StreakState;
    nextState: StreakState;
    event: string;
    reason: string;
    action: string;
    timestamp: string;
  } | null>({
    previousState: 'AT_RISK',
    nextState: 'FROZEN',
    event: 'DAY_MISSED (Freeze Available: YES)',
    reason: FSMReasonExplainer('FROZEN'),
    action: 'Tactical Freeze Shield consumed automatically to protect 11-day streak.',
    timestamp: new Date().toLocaleTimeString(),
  });

  const handleRunTransition = () => {
    const nextState = transitionStateTable(currentState, event, hasFreeze);
    const reason = FSMReasonExplainer(nextState);

    let action = 'State updated deterministically.';
    if (nextState === 'FROZEN') action = 'Tactical Freeze Shield consumed automatically to protect streak.';
    else if (nextState === 'BROKEN') action = 'Streak zeroed; Recovery Path activated.';
    else if (nextState === 'RECOVERED') action = 'Recovery challenge verified; streak reset to 1 day.';
    else if (nextState === 'ACTIVE') action = 'Daily code proof verified; streak active.';

    setLastResult({
      previousState: currentState,
      nextState,
      event: `${event} (Freeze Available: ${hasFreeze ? 'YES' : 'NO'})`,
      reason,
      action,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  return (
    <Card className="border-amber-500/30 bg-slate-900/90 shadow-2xl space-y-4 overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base flex items-center gap-2 text-white">
              <Cpu className="w-5 h-5 text-amber-400" />
              <span>Interactive FSM Evaluator Playground</span>
            </CardTitle>
            <CardDescription>
              Test any deterministic state transition scenario live in 1 click
            </CardDescription>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-bold">
            Pure TS Engine Test Harness
          </span>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
        {/* Input Controls */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3.5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" /> Simulation Input Parameters
          </h4>

          <div className="space-y-1.5 text-xs">
            <label className="text-slate-400 font-semibold">1. Current State:</label>
            <select
              value={currentState}
              onChange={(e) => setCurrentState(e.target.value as StreakState)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono text-xs focus:outline-none"
            >
              <option value="ACTIVE">ACTIVE — Normal Streak Active</option>
              <option value="AT_RISK">AT_RISK — Window Expiring</option>
              <option value="FROZEN">FROZEN — Freeze Shield Consumed</option>
              <option value="BROKEN">BROKEN — Missed Day & Zero Streak</option>
              <option value="RECOVERED">RECOVERED — Recovery Challenge Submitted</option>
            </select>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="text-slate-400 font-semibold">2. Trigger Event:</label>
            <select
              value={event}
              onChange={(e) => setEvent(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-blue-300 font-mono text-xs focus:outline-none"
            >
              <option value="SUBMIT">SUBMIT — Normal Code Proof Submitted</option>
              <option value="DAY_MISSED">DAY_MISSED — Daily Deadline Expired</option>
              <option value="WINDOW_WARNING">WINDOW_WARNING — 2 Hours Before Midnight</option>
              <option value="RECOVERY_SUBMIT">RECOVERY_SUBMIT — Recovery Task Completed</option>
            </select>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="text-slate-400 font-semibold">3. Freeze Shield Available?</label>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setHasFreeze(true)}
                className={`flex-1 py-2 rounded-xl font-bold border transition-colors ${
                  hasFreeze ? 'bg-blue-500/20 border-blue-400 text-blue-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                YES (Shield Available)
              </button>
              <button
                type="button"
                onClick={() => setHasFreeze(false)}
                className={`flex-1 py-2 rounded-xl font-bold border transition-colors ${
                  !hasFreeze ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                NO (0 Freezes Left)
              </button>
            </div>
          </div>

          <Button onClick={handleRunTransition} className="w-full font-bold py-2.5 text-xs flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-slate-950" />
            <span>RUN DETERMINISTIC TRANSITION</span>
          </Button>
        </div>

        {/* Output Telemetry Display */}
        {lastResult && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Deterministic Output Telemetry
              </span>
              <span className="text-[10px] text-slate-500">{lastResult.timestamp}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Transition Execution:</span>
                <span className="text-white font-bold flex items-center gap-1">
                  <span className="text-amber-400">{lastResult.previousState}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-emerald-400">{lastResult.nextState}</span>
                </span>
              </div>

              <div className="text-[11px]">
                <span className="text-slate-500 block">Trigger Context:</span>
                <span className="text-blue-300">{lastResult.event}</span>
              </div>

              <div className="text-[11px]">
                <span className="text-slate-500 block">System Action Taken:</span>
                <span className="text-slate-200">{lastResult.action}</span>
              </div>
            </div>

            {/* Why did state change explainer */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/20 text-xs space-y-1">
              <span className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
                <HelpCircle className="w-3.5 h-3.5" /> State Explanation ("Why did my state change?"):
              </span>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">{lastResult.reason}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
