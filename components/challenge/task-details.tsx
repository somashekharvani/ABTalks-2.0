'use client';

import React, { useState } from 'react';
import { Clock, Code2, Sparkles, ExternalLink, Play, BookOpen, Star, Download, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SaaSVideoPlayer } from '@/components/ui/saas-video-player';
import { downloadPdfNotes } from '@/lib/export-pdf';
import { Task } from '@/types';

interface TaskDetailsProps {
  task: Task;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'notes' | 'code'>('all');

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

      {/* Structured SaaS Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'all' ? 'bg-slate-800 text-white shadow-md border border-slate-700' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview Mode
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'video' ? 'bg-slate-800 text-amber-400 shadow-md border border-slate-700' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Play className="w-3.5 h-3.5" /> Video Class
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'notes' ? 'bg-slate-800 text-amber-400 shadow-md border border-slate-700' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Lecture Notes
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'code' ? 'bg-slate-800 text-blue-400 shadow-md border border-slate-700' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" /> Code Example
        </button>
      </div>

      {/* Video Class Lesson Player Component */}
      {(activeTab === 'all' || activeTab === 'video') && (
        <SaaSVideoPlayer
          title={task.videoTitle}
          duration={task.videoDuration}
          youtubeUrl={task.videoClassUrl}
        />
      )}

      {/* Technical Lecture Notes & PDF Download */}
      {(activeTab === 'all' || activeTab === 'notes') && (
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Day {task.day} Technical Lecture Notes
            </h4>

            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadPdfNotes(task)}
              className="text-[11px] font-bold gap-1.5 border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF Notes</span>
            </Button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{task.notes}</p>
        </div>
      )}

      {/* Code Example Implementation */}
      {(activeTab === 'all' || activeTab === 'code') && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5 text-blue-400" /> Day-Specific Code Example
          </h4>
          <pre className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto leading-relaxed">
            <code>{task.codeExample}</code>
          </pre>
        </div>
      )}

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
