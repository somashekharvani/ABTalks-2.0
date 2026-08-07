import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden text-center sm:text-left">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-600/15 via-orange-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 shadow-lg text-xs font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>ABTalks 2.0 — Built for Consistency</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Students don't fail because they lack skill — <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                they fail because they lose momentum.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              The 60-Day Developer Challenge engineered with state-machine streak protection, non-punitive recovery paths, and verified GitHub proof-of-work.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group font-bold text-base px-8 py-3.5">
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/day/12" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
                  View Challenge Day 12
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center sm:justify-start gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> State-Machine Engine
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" /> Tactical Streak Freeze
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-purple-400" /> Recruiter Proof Gallery
              </span>
            </div>
          </div>

          {/* Interactive Card Mockup Preview */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative rounded-3xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">abtalks.dev/dashboard</span>
                </div>
                <Badge variant="amber">Live FSM Engine</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block font-medium">Active Streak</span>
                  <span className="text-2xl font-extrabold text-white mt-1 block">11 Days 🔥</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">+1 Today</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block font-medium">Momentum Score</span>
                  <span className="text-2xl font-extrabold text-purple-400 mt-1 block">92 /100</span>
                  <span className="text-[10px] text-purple-300 font-semibold">Elite Velocity ▲ +8</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-blue-200">Tactical Shield Active</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full">1 Freeze Left</span>
                </div>
                <p className="text-[11px] text-blue-300/80 mt-1">Missed day on Day 10 auto-absorbed. Streak preserved!</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
