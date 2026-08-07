'use client';

import React from 'react';
import { Bot, Clock, AlertTriangle, TrendingUp, Sparkles, Target, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AICoachIntelligence } from '@/types';

interface AICoachIntelligenceProps {
  aiCoach: AICoachIntelligence;
}

export function AICoachIntelligenceCard({ aiCoach }: AICoachIntelligenceProps) {
  return (
    <Card className="border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Bot className="w-32 h-32 text-amber-400" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <span>AI Consistency Intelligence Engine</span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">Predictive Model</span>
              </CardTitle>
              <CardDescription>Real-time predictive analytics on streak stability & velocity</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="space-y-4">
        {/* Recommendation Callout */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="text-xs font-bold text-amber-300">Actionable Prescription:</h5>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">{aiCoach.recommendedAction}</p>
          </div>
        </div>

        {/* Behavioral Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> Peak Productivity
            </span>
            <p className="text-xs font-bold text-white font-mono">{aiCoach.peakWindow}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" /> High-Risk Window
            </span>
            <p className="text-xs font-bold text-orange-300 font-mono">{aiCoach.highRiskDay}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-400" /> Domain Velocity
            </span>
            <p className="text-xs font-bold text-purple-300 truncate">{aiCoach.domainVelocityInsight}</p>
          </div>
        </div>

        {/* Predictive Horizons */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-medium">7-Day Streak Success Rate:</span>
            <span className="text-emerald-400 font-bold font-mono text-sm">{aiCoach.successProbability7Day}%</span>
          </div>

          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300 font-medium">Day 30 Momentum Forecast:</span>
            <span className="text-amber-400 font-bold font-mono text-sm">{aiCoach.day30MomentumPrediction} / 100</span>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300 font-medium">60-Day Completion Rate:</span>
            <span className="text-purple-300 font-bold font-mono text-sm">{aiCoach.day60CompletionProbability}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
