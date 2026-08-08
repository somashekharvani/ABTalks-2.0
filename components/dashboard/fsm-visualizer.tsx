'use client';

import React from 'react';
import { Network, Flame, Snowflake, AlertTriangle, RefreshCw, CheckCircle2, Terminal, Cpu } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StreakState, FSMTransitionTelemetry } from '@/types';
import { cn } from '@/lib/utils';

interface FSMVisualizerProps {
  currentState: StreakState;
  telemetry?: FSMTransitionTelemetry;
}

export function FSMVisualizer({ currentState, telemetry }: FSMVisualizerProps) {
  const nodes = [
    {
      state: 'ACTIVE' as StreakState,
      label: 'ACTIVE',
      desc: 'Submitting daily challenges',
      icon: <Flame className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/60 bg-amber-500/10 text-amber-300 shadow-amber-500/20',
    },
    {
      state: 'AT_RISK' as StreakState,
      label: 'AT RISK',
      desc: 'Missed window before midnight',
      icon: <AlertTriangle className="w-4 h-4 text-orange-400" />,
      color: 'border-orange-500/60 bg-orange-500/10 text-orange-300 shadow-orange-500/20',
    },
    {
      state: 'FROZEN' as StreakState,
      label: 'FROZEN',
      desc: 'Tactical Shield freeze consumed',
      icon: <Snowflake className="w-4 h-4 text-blue-400" />,
      color: 'border-blue-500/60 bg-blue-500/10 text-blue-300 shadow-blue-500/20',
    },
    {
      state: 'BROKEN' as StreakState,
      label: 'BROKEN',
      desc: 'Streak zeroed, Recovery path open',
      icon: <RefreshCw className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-500/60 bg-purple-500/10 text-purple-300 shadow-purple-500/20',
    },
    {
      state: 'RECOVERED' as StreakState,
      label: 'RECOVERED',
      desc: 'Submitted recovery challenge',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300 shadow-emerald-500/20',
    },
  ];

  return (
    <Card className="border-amber-500/20 bg-slate-900/90 shadow-xl overflow-hidden space-y-4">
      <CardHeader className="mb-0 pb-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Network className="w-5 h-5 text-amber-400" />
              <span>Interactive FSM Finite State Machine Visualizer</span>
            </CardTitle>
            <CardDescription>Live state transition diagram & real-time telemetry log</CardDescription>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-bold shrink-0">
            Current State: {currentState}
          </span>
        </div>
      </CardHeader>

      {/* State Node Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-1">
        {nodes.map((node) => {
          const isActive = currentState === node.state;
          return (
            <div
              key={node.state}
              className={cn(
                'p-3 rounded-xl border text-center transition-all duration-300 relative select-none',
                isActive
                  ? `${node.color} scale-105 shadow-xl ring-2 ring-amber-400/50 animate-pulse`
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
              )}
            >
              <div className="flex justify-center mb-1.5">{node.icon}</div>
              <h5 className="text-xs font-black tracking-tight">{node.label}</h5>
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">{node.desc}</p>

              {isActive && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-black uppercase tracking-wider shadow-md">
                  Active Node
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Explicit System State Telemetry Console */}
      {telemetry && (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              <Cpu className="w-4 h-4" /> System Telemetry Log
            </span>
            <span className="text-[10px] text-slate-500">Deterministic Engine v2.0</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-[11px]">
            <div>
              <span className="text-slate-500 block">Current State:</span>
              <span className="text-amber-400 font-bold">● {telemetry.currentState}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Last Transition:</span>
              <span className="text-slate-200 font-bold">{telemetry.previousState} ➔ {telemetry.currentState}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Trigger Event:</span>
              <span className="text-blue-300 font-bold">{telemetry.triggerEvent}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Active Day:</span>
              <span className="text-purple-300 font-bold">Day {telemetry.activeDay}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-900 text-slate-300 text-[11px]">
            <span className="text-slate-500">Action: </span>
            <span className="text-slate-200">{telemetry.actionTaken}</span>
          </div>
        </div>
      )}
    </Card>
  );
}
