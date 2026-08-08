'use client';

import React from 'react';
import { Layers, Github, ExternalLink, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Project, ProjectMilestone } from '@/types';

interface ProjectCardProps {
  project: Project;
  milestone: ProjectMilestone;
  currentDay: number;
}

export function ProjectCard({ project, milestone, currentDay }: ProjectCardProps) {
  const elapsedDays = Math.max(1, currentDay - project.startDay + 1);
  const progressPercentage = Math.min(100, Math.round((elapsedDays / project.durationDays) * 100));

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/20 shadow-xl space-y-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="purple">Current Project</Badge>
            <Badge variant="outline">{project.durationDays}-Day Sprint</Badge>
          </div>
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-amber-400 hover:underline font-mono flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5 text-white" /> 1 Repo per Project <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <CardTitle className="text-xl font-bold text-white mt-1">{project.title}</CardTitle>
        <CardDescription className="text-xs text-slate-300">{project.description}</CardDescription>
      </CardHeader>

      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Sprint Progress (Days {project.startDay}–{project.endDay}):</span>
          <span className="text-purple-300 font-mono font-bold">
            Day {currentDay} ({progressPercentage}%)
          </span>
        </div>
        <Progress value={progressPercentage} barClassName="from-purple-500 to-amber-500" />

        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Today's Build Milestone:
            </h5>
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> ~{milestone.estimatedMinutes} mins
            </span>
          </div>

          <p className="text-xs text-slate-200 font-semibold">{milestone.title}</p>

          <div className="space-y-1">
            {milestone.requirements.map((req, idx) => (
              <div key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
