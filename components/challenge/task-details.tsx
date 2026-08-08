'use client';

import React from 'react';
import { Clock, Code2, Sparkles, ExternalLink, Play, BookOpen, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';

interface TaskDetailsProps {
  task: Task;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/90 shadow-xl space-y-4">
      <CardHeader>
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="amber">Day {task.day} of 60</Badge>
            <Badge variant="default">{task.category}</Badge>
            <Badge variant="purple">{task.difficulty}</Badge>
            <Badge variant="outline" className="ml-auto font-mono text-amber-400">
              Score: {task.score}/100 ⭐
            </Badge>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {task.title}
          </CardTitle>
          <CardDescription className="text-slate-300 mt-2 text-sm leading-relaxed">
            {task.description}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Video Class Lesson Embedded Player */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Play className="w-4 h-4 text-amber-400" /> {task.videoTitle}
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
            ⏱ {task.videoDuration} Class Lesson
          </span>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
          <iframe
            src={task.videoClassUrl}
            title={task.videoTitle}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Technical Lecture Notes */}
      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
        <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Technical Lecture Notes
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">{task.notes}</p>
      </div>

      {/* Code Example Implementation */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
        <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5 uppercase tracking-wider">
          <Code2 className="w-3.5 h-3.5 text-blue-400" /> Day-Specific Code Example
        </h4>
        <pre className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto leading-relaxed">
          <code>{task.codeExample}</code>
        </pre>
      </div>

      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-amber-400" /> ~{task.estimatedHours} Hours Estimated
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-purple-400" /> Automated Verification Ready
          </span>
        </div>

        <a
          href={task.githubTemplate}
          target="_blank"
          rel="noreferrer"
          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 hover:underline"
        >
          <Code2 className="w-4 h-4" /> Starter Template Repository <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Card>
  );
}
