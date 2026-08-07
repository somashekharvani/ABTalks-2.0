import React from 'react';
import { ExternalLink, Github, Linkedin, ShieldCheck, Trophy, Flame, Percent, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardViewModel } from '@/types';

interface RecruiterPreviewProps {
  viewModel: DashboardViewModel;
}

export function RecruiterPreview({ viewModel }: RecruiterPreviewProps) {
  const { student, streak, stats, achievements, momentum } = viewModel;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Recruiter Banner Header */}
      <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900/90 p-6">
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
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Candidate
                </Badge>
              </div>
              <p className="text-xs text-slate-300 font-medium">{student.role}</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xl line-clamp-2">{student.bio}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={student.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700/80 transition-colors"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href={student.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold flex items-center gap-2 border border-blue-500/30 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-blue-400/60" />
            </a>
          </div>
        </div>
      </Card>

      {/* Recruiter High-Level Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-800">
          <p className="text-xs font-medium text-slate-400">Longest Streak</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-extrabold text-amber-400">{streak.longestStreak}</span>
            <span className="text-xs text-slate-400 font-medium">consecutive days</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-500" /> Proven Daily Discipline
          </p>
        </Card>

        <Card className="p-4 border-slate-800">
          <p className="text-xs font-medium text-slate-400">Challenge Completion</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-extrabold text-emerald-400">{stats.completionPercentage}%</span>
            <span className="text-xs text-slate-400 font-medium">rate</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <Percent className="w-3 h-3 text-emerald-500" /> {stats.totalSubmissions} of {student.currentDay} tasks submitted
          </p>
        </Card>

        <Card className="p-4 border-slate-800">
          <p className="text-xs font-medium text-slate-400">Consistency Rating</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-extrabold text-purple-400">{momentum.value}</span>
            <span className="text-xs text-slate-400 font-medium">/100</span>
          </div>
          <p className="text-[10px] text-purple-300 mt-1 font-semibold">Tier: {momentum.tier}</p>
        </Card>

        <Card className="p-4 border-slate-800">
          <p className="text-xs font-medium text-slate-400">Total Engineering Hours</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-extrabold text-blue-400">~{stats.totalHoursInvested}h</span>
            <span className="text-xs text-slate-400 font-medium">logged</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-500" /> Hands-on Project Time
          </p>
        </Card>
      </div>

      {/* Recruiter Proof Gallery & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-800">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Verified Achievements & Badges</span>
            </CardTitle>
            <CardDescription>Verified engineering milestones unlocked during challenge</CardDescription>
          </CardHeader>

          <div className="space-y-2.5">
            {achievements.filter((a) => a.unlocked).map((badge) => (
              <div key={badge.id} className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-200">{badge.title}</h5>
                  <p className="text-[11px] text-slate-400">{badge.description}</p>
                </div>
                <Badge variant="amber">{badge.unlockedAt || 'Unlocked'}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-slate-800">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Proof of Work Submission Audit</span>
            </CardTitle>
            <CardDescription>Direct links to publicly submitted code repositories</CardDescription>
          </CardHeader>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">GitHub Repository Verified:</span>
              <a href={student.githubUrl} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline flex items-center gap-1 font-mono">
                {student.githubUrl.replace('https://', '')} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <span className="text-slate-400 font-medium">LinkedIn Code Demo Proof:</span>
              <a href={student.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1 font-mono">
                {student.linkedinUrl.replace('https://', '')} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <span className="text-slate-400 font-medium">Submission Consistency:</span>
              <span className="text-emerald-400 font-bold">{stats.totalSubmissions} Code Commits Verified</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
