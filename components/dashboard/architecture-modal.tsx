'use client';

import React, { useState } from 'react';
import { Layers, Cpu, ShieldCheck, X, ArrowRight, Terminal, CheckCircle2, GitBranch, Database } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ArchitectureModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-mono text-xs font-bold gap-1.5"
      >
        <Layers className="w-3.5 h-3.5 text-amber-400" />
        <span>View FSM Architecture Spec</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-5">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  Technical Architecture Specification
                </span>
                <span className="text-[10px] font-mono text-slate-400">Day 12 Deterministic Engine</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">ABTalks 2.0 FSM Architecture</h3>
              <p className="text-xs text-amber-300 font-semibold mt-1">
                "React renders the UI state; the pure TypeScript FSM owns the transition logic."
              </p>
            </div>

            {/* Architecture Pipeline Diagram */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-amber-400" /> Layer-by-Layer Architectural Flow
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[11px]">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block">1. TaskFlow UI</span>
                  <span className="text-slate-400 text-[10px]">React 19 Components</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-blue-400 font-bold block">2. Optimistic UI</span>
                  <span className="text-slate-400 text-[10px]">Instant Client Update</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 space-y-1">
                  <span className="text-purple-400 font-bold block">3. Pure TS FSM</span>
                  <span className="text-slate-400 text-[10px]">Deterministic Machine</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">4. Audit Trail</span>
                  <span className="text-slate-400 text-[10px]">Telemetry & Storage</span>
                </div>
              </div>
            </div>

            {/* Deterministic Transition Rules Table */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" /> State Transition Table & Guards
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">From State</th>
                      <th className="py-2 px-3">Event Trigger</th>
                      <th className="py-2 px-3">Guard Condition</th>
                      <th className="py-2 px-3">To State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-300">
                    <tr>
                      <td className="py-2 px-3 text-amber-400">ACTIVE</td>
                      <td className="py-2 px-3 text-blue-300">WINDOW_WARNING</td>
                      <td className="py-2 px-3 text-slate-500">2h Before Midnight</td>
                      <td className="py-2 px-3 text-orange-400">AT_RISK</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-orange-400">AT_RISK</td>
                      <td className="py-2 px-3 text-blue-300">DAY_MISSED</td>
                      <td className="py-2 px-3 text-emerald-400">freezeCount &gt; 0</td>
                      <td className="py-2 px-3 text-blue-400">FROZEN</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-orange-400">AT_RISK</td>
                      <td className="py-2 px-3 text-blue-300">DAY_MISSED</td>
                      <td className="py-2 px-3 text-rose-400">freezeCount === 0</td>
                      <td className="py-2 px-3 text-purple-400">BROKEN</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-blue-400">FROZEN</td>
                      <td className="py-2 px-3 text-blue-300">SUBMIT</td>
                      <td className="py-2 px-3 text-slate-500">Valid Code Proof</td>
                      <td className="py-2 px-3 text-amber-400">ACTIVE</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-purple-400">BROKEN</td>
                      <td className="py-2 px-3 text-blue-300">RECOVERY_SUBMIT</td>
                      <td className="py-2 px-3 text-slate-500">Recovery Challenge</td>
                      <td className="py-2 px-3 text-emerald-400">RECOVERED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Architecture Principles List */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Engineering Guarantees
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Deterministic:</strong> Zero random or non-repeatable state side effects.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Optimistic Rollback:</strong> Reverts client mutations automatically on validation error.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Invalid Transition Guards:</strong> Rejects un-permitted state skips (e.g. BROKEN ➔ ACTIVE).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Idempotency Protection:</strong> Prevents duplicate submissions from inflating streak count.</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => setIsOpen(false)}>
                Close Architecture Spec
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
