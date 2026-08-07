import React from 'react';
import { Github, Linkedin, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Submission } from '@/types';
import { formatDate } from '@/lib/utils';

interface PreviousSubmissionProps {
  submission: Submission;
}

export function PreviousSubmissionPreview({ submission }: PreviousSubmissionProps) {
  return (
    <Card className="border-emerald-500/30 bg-emerald-950/10 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Previous Submission</span>
          </CardTitle>
          <Badge variant="green">{submission.status}</Badge>
        </div>
        <CardDescription className="text-slate-400 text-xs">
          Submitted on {formatDate(submission.timestamp)}
        </CardDescription>
      </CardHeader>

      <div className="space-y-2.5 text-xs">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-white" /> Repository:
            </span>
            <a
              href={submission.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 font-mono truncate max-w-[200px]"
            >
              {submission.githubUrl.replace('https://', '')} <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-blue-400" /> Post Proof:
            </span>
            <a
              href={submission.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-1 font-mono truncate max-w-[200px]"
            >
              {submission.linkedinUrl.replace('https://', '')} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {submission.feedback && (
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 italic text-xs leading-relaxed">
            "{submission.feedback}"
          </div>
        )}
      </div>
    </Card>
  );
}
