'use client';

import React, { useState } from 'react';
import { Linkedin, Copy, Check, ExternalLink, Share2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projectEngine } from '@/lib/project-engine';

interface LinkedInGeneratorProps {
  studentName: string;
  day: number;
  lessonTitle: string;
  milestoneTitle: string;
  githubUrl: string;
  concepts: string[];
}

export function LinkedInGenerator({
  studentName,
  day,
  lessonTitle,
  milestoneTitle,
  githubUrl,
  concepts,
}: LinkedInGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const template = projectEngine.generateLinkedInTemplate(
    studentName,
    day,
    lessonTitle,
    milestoneTitle,
    githubUrl,
    concepts
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-blue-500/20 bg-gradient-to-b from-slate-900 via-slate-900/90 to-blue-950/20 shadow-xl space-y-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn Daily Proof Post Template</span>
          </CardTitle>
          <Button size="sm" variant="secondary" onClick={handleCopy} className="text-xs font-semibold gap-1">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
            <span>{copied ? 'Copied Post' : 'Copy Template'}</span>
          </Button>
        </div>
        <CardDescription className="text-xs text-slate-300">
          Generated social proof post to share today’s build milestone with your network
        </CardDescription>
      </CardHeader>

      <pre className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
        {template}
      </pre>

      <div className="flex items-center justify-between pt-1 text-xs">
        <span className="text-slate-400">Share on LinkedIn to complete daily social proof step</span>
        <a
          href="https://www.linkedin.com/feed/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline font-semibold flex items-center gap-1"
        >
          <Share2 className="w-3.5 h-3.5" /> Open LinkedIn Feed <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Card>
  );
}
