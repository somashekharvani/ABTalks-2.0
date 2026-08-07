import React from 'react';
import { Clock, Code2, Sparkles, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';

interface TaskDetailsProps {
  task: Task;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
      <CardHeader>
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="amber">Day {task.day} of 60</Badge>
            <Badge variant="default">{task.category}</Badge>
            <Badge variant="purple">{task.difficulty}</Badge>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {task.title}
          </CardTitle>
          <CardDescription className="text-slate-300 mt-2 text-sm leading-relaxed">
            {task.description}
          </CardDescription>
        </div>
      </CardHeader>

      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-amber-400" /> ~{task.estimatedHours} Hours Estimated
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-purple-400" /> Verification System Ready
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
