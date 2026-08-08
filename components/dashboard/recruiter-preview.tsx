'use client';

import React from 'react';
import { ExternalLink, Github, Linkedin, ShieldCheck, Trophy, Flame, Percent, Clock, Bot, Download, Building2, Star, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardViewModel } from '@/types';

interface RecruiterPreviewProps {
  viewModel: DashboardViewModel;
}

export function RecruiterPreview({ viewModel }: RecruiterPreviewProps) {
  const { student, streak, stats, achievements, momentum, recruiterEval } = viewModel;

  const handleDownloadProofReport = () => {
    const reportText = `ABTalks 2.0 Candidate Verification Report
Candidate: ${student.name} (${student.role})
Current Day: ${student.currentDay} | Total Hours: ~${stats.totalHoursInvested}h
Longest Streak: ${streak.longestStreak} days
Completion Rate: ${stats.completionPercentage}%
Engineering Reputation Score: ${recruiterEval.reputationScore.total}/100
Executive Summary: ${recruiterEval.executiveSummary}
Recommendation: ${recruiterEval.hiringRecommendation}
Verified Repositories: ${student.githubUrl}
Verified LinkedIn Proof: ${student.linkedinUrl}
Report Generated: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ABTalks_Verification_Report_${student.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Recruiter Banner Header */}
      <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900/90 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{student.name}</h2>
                <Badge variant="green">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Candidate Profile
                </Badge>
              </div>
              <p className="text-xs text-slate-300 font-medium">{student.role}</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xl line-clamp-2">{student.bio}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
            <Button size="sm" variant="primary" onClick={handleDownloadProofReport} className="font-bold gap-1.5 text-xs">
              <Download className="w-4 h-4" /> Download Proof Report
            </Button>
            <a
              href={student.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700/80 transition-colors"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </Card>

      {/* AI Executive Recruiter Summary & Hiring Recommendation */}
      <Card className="border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">AI Executive Recruiter Evaluation</h4>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                100% Verified Code Proof
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{recruiterEval.executiveSummary}</p>
            <div className="pt-1.5 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <span>🎯 Recommendation:</span>
              <span className="text-slate-100">{recruiterEval.hiringRecommendation}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Engineering Reputation Score & AI Company Match Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Engineering Reputation Breakdown */}
        <Card className="border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Engineering Reputation Score</span>
              </CardTitle>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {recruiterEval.reputationScore.total} <span className="text-xs text-slate-400 font-normal">/100</span>
              </span>
            </div>
          </CardHeader>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Code Quality & Type Safety:</span>
              <span className="text-slate-200 font-mono font-bold">{recruiterEval.reputationScore.codeQuality}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Daily Habit Consistency:</span>
              <span className="text-slate-200 font-mono font-bold">{recruiterEval.reputationScore.consistency}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Unit Testing Coverage:</span>
              <span className="text-slate-200 font-mono font-bold">{recruiterEval.reputationScore.testing}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Architecture & Documentation:</span>
              <span className="text-slate-200 font-mono font-bold">{recruiterEval.reputationScore.documentation}%</span>
            </div>

            {/* Evidence Behind Score */}
            <div className="pt-2 border-t border-slate-800 space-y-1 font-sans text-[11px]">
              <span className="text-amber-400 font-bold block uppercase tracking-wider text-[10px]">Evidence Behind Score:</span>
              <div className="space-y-1 text-slate-300">
                <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Pure TypeScript FSM with 8/8 Vitest tests passed</div>
                <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Deterministic transition table & guards</div>
                <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Optimistic UI with failure rollback strategy</div>
                <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Offline-first LocalStorage sync & audit trail</div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Company Culture Match */}
        <Card className="border-slate-800">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" />
              <span>AI Company Match Index</span>
            </CardTitle>
            <CardDescription>Match rating calculated from candidate velocity and resilience</CardDescription>
          </CardHeader>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-medium">High-Growth Startup</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono">{recruiterEval.companyMatches.startup}% Match</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-medium">Amazon</span>
              <span className="text-xl font-extrabold text-purple-400 font-mono">{recruiterEval.companyMatches.amazon}% Match</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-medium">Google</span>
              <span className="text-xl font-extrabold text-amber-400 font-mono">{recruiterEval.companyMatches.google}% Match</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-medium">Microsoft</span>
              <span className="text-xl font-extrabold text-blue-400 font-mono">{recruiterEval.companyMatches.microsoft}% Match</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Verified Skill Evidence Matrix */}
      <Card className="border-amber-500/20 bg-slate-900/90 shadow-xl space-y-4">

        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Verified Candidate Skill Evidence</span>
              </CardTitle>
              <CardDescription>Skills backed by real assessment scores, project milestones, and GitHub commit artifacts</CardDescription>
            </div>
            <Badge variant="amber">High Skill Confidence</Badge>
          </div>
        </CardHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">React 19 & State</span>
              <span className="text-xs font-mono font-bold text-emerald-400">High Confidence</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between"><span className="text-slate-400">Assessment Average:</span><span className="font-mono font-bold text-amber-400">88%</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Verified Milestones:</span><span className="font-mono font-bold text-slate-200">7</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Verified Projects:</span><span className="font-mono font-bold text-purple-300">3</span></div>
              <div className="flex justify-between"><span className="text-slate-400">GitHub Proof:</span><span className="font-mono text-emerald-400">✓ 12 Commits</span></div>
            </div>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> Component Architecture</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> useState & Custom Hooks</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> LocalStorage Persistence</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">TypeScript & Types</span>
              <span className="text-xs font-mono font-bold text-emerald-400">High Confidence</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between"><span className="text-slate-400">Assessment Average:</span><span className="font-mono font-bold text-amber-400">92%</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Verified Milestones:</span><span className="font-mono font-bold text-slate-200">8</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Verified Projects:</span><span className="font-mono font-bold text-purple-300">3</span></div>
              <div className="flex justify-between"><span className="text-slate-400">GitHub Proof:</span><span className="font-mono text-emerald-400">✓ 15 Commits</span></div>
            </div>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> Static Type Checking</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> Generics & Utility Types</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> Strict Null Checks</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Next.js 15 & Layouts</span>
              <span className="text-xs font-mono font-bold text-purple-400">Building</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between"><span className="text-slate-400">Assessment Average:</span><span className="font-mono font-bold text-amber-400">85%</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Verified Milestones:</span><span className="font-mono font-bold text-slate-200">5</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Verified Projects:</span><span className="font-mono font-bold text-purple-300">2</span></div>
              <div className="flex justify-between"><span className="text-slate-400">GitHub Proof:</span><span className="font-mono text-emerald-400">✓ 9 Commits</span></div>
            </div>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> App Router Architecture</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> Server Actions & API Routes</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold"><Check className="w-3.5 h-3.5" /> Dynamic Route Handlers</div>
            </div>
          </div>
        </div>
      </Card>


      {/* Recruiter Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-800">
          <p className="text-xs font-medium text-slate-400">Longest Streak</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-extrabold text-amber-400">{streak.longestStreak}</span>
            <span className="text-xs text-slate-400 font-medium">days</span>
          </div>
        </Card>

        <Card className="p-4 border-slate-800">
          <p className="text-xs font-medium text-slate-400">Challenge Completion</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-extrabold text-emerald-400">{stats.completionPercentage}%</span>
            <span className="text-xs text-slate-400 font-medium">rate</span>
          </div>
        </Card>

        <Card className="p-4 border-slate-800">
          <p className="text-xs font-medium text-slate-400">Consistency Rating</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-extrabold text-purple-400">{momentum.value}</span>
            <span className="text-xs text-slate-400 font-medium">/100</span>
          </div>
        </Card>

        <Card className="p-4 border-slate-800">
          <p className="text-xs font-medium text-slate-400">Engineering Hours</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-extrabold text-blue-400">~{stats.totalHoursInvested}h</span>
            <span className="text-xs text-slate-400 font-medium">logged</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
