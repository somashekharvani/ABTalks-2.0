import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Code2 } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task, Submission } from '@/types';

interface TaskCardProps {
  task: Task;
  submission?: Submission;
}

export function TaskCard({ task, submission }: TaskCardProps) {
  const isSubmitted = !!submission;

  return (
    <Card className="relative overflow-hidden border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950/90">
      <CardHeader className="mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="amber">Day {task.day}</Badge>
          <Badge variant="default">{task.category}</Badge>
          <Badge variant="outline">{task.difficulty}</Badge>
        </div>
        {isSubmitted && (
          <Badge variant="green" className="ml-auto">
            <CheckCircle2 className="w-3 h-3" /> Submitted
          </Badge>
        )}
      </CardHeader>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-100 tracking-tight">{task.title}</h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{task.description}</p>

        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Requirements:</span>
          <ul className="space-y-1">
            {task.requirements.slice(0, 3).map((req, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span className="truncate">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> ~{task.estimatedHours}h
            </span>
            <span className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-blue-400" /> Template
            </span>
          </div>

          <Link href={`/day/${task.day}`}>
            <Button size="sm" variant={isSubmitted ? 'secondary' : 'primary'} className="group">
              <span>{isSubmitted ? 'View Submission' : 'Start Challenge'}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
