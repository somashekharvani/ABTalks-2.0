'use client';

import React from 'react';
import { Layers, Github, ExternalLink, ShieldCheck, Trophy, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';

interface ProjectPortfolioProps {
  completedProjects: Project[];
  activeProject: Project;
}

export function ProjectPortfolio({ completedProjects, activeProject }: ProjectPortfolioProps) {
  const allProjects = [activeProject, ...completedProjects];

  return (
    <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
      <CardHeader>
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Verified Student Project Portfolio</span>
          </CardTitle>
          <CardDescription>Verified 7-day & 14-day production projects built during challenge</CardDescription>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allProjects.map((proj) => {
          const isDone = completedProjects.some((p) => p.id === proj.id);
          return (
            <div
              key={proj.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-colors ${
                isDone
                  ? 'bg-slate-950/60 border-emerald-500/30'
                  : 'bg-slate-800/40 border-amber-500/30 ring-1 ring-amber-500/20'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={isDone ? 'green' : 'amber'}>
                    {isDone ? '✓ Verified Complete' : 'In Progress'}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-400">{proj.durationDays} Days</span>
                </div>

                <h4 className="text-sm font-bold text-white tracking-tight">{proj.title}</h4>
                <p className="text-xs text-slate-400 leading-snug line-clamp-2">{proj.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex flex-wrap gap-1">
                  {proj.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={proj.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <Github className="w-3.5 h-3.5 text-white" /> Repository <ExternalLink className="w-3 h-3" />
                  </a>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
