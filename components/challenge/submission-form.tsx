'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Send, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { validateGithubUrl, validateLinkedinUrl } from '@/lib/utils';
import { Submission, DashboardViewModel } from '@/types';
import { SuccessAnimation } from './success-animation';
import confetti from 'canvas-confetti';

interface SubmissionFormProps {
  day: number;
  studentId: string;
  existingSubmission?: Submission;
  onOptimisticSubmit: (tempSubmission: Submission) => void;
  onSuccess: (viewModel: DashboardViewModel, submission: Submission) => void;
  onRollback: (errorMsg: string) => void;
}

type SyncStage = 'idle' | 'optimistic_submitted' | 'syncing' | 'verified' | 'failed';

export function SubmissionForm({
  day,
  studentId,
  existingSubmission,
  onOptimisticSubmit,
  onSuccess,
  onRollback,
}: SubmissionFormProps) {
  const [githubUrl, setGithubUrl] = useState(existingSubmission?.githubUrl || `https://github.com/${studentId}/abtalks-day-${day}`);
  const [linkedinUrl, setLinkedinUrl] = useState(existingSubmission?.linkedinUrl || `https://linkedin.com/posts/${studentId}_day-${day}-completed`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncStage, setSyncStage] = useState<SyncStage>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateGithubUrl(githubUrl)) {
      setErrorMessage('Invalid GitHub repository URL format. Example: https://github.com/username/repo');
      return;
    }

    if (!validateLinkedinUrl(linkedinUrl)) {
      setErrorMessage('Invalid LinkedIn post URL format. Example: https://linkedin.com/posts/username_post');
      return;
    }

    setIsSubmitting(true);
    setSyncStage('optimistic_submitted');

    // Stage 1: Immediate Optimistic Update
    const optimisticSub: Submission = {
      id: `temp-${Date.now()}`,
      studentId,
      day,
      githubUrl,
      linkedinUrl,
      status: 'submitted',
      timestamp: new Date().toISOString(),
      feedback: 'Optimistic verification pending server response...',
    };

    onOptimisticSubmit(optimisticSub);

    // Stage 2: Syncing with server
    setTimeout(() => {
      setSyncStage('syncing');
    }, 400);

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          day,
          githubUrl,
          linkedinUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Submission failed server validation');
      }

      setSyncStage('verified');

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        setShowSuccess(true);
        onSuccess(data.viewModel, data.submission);
      }, 500);
    } catch (err) {
      setSyncStage('failed');
      const msg = (err as Error).message || 'Failed to submit code proof';
      setErrorMessage(`Couldn't verify submission: ${msg}. Your previous state has been restored. Try again.`);
      onRollback(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return <SuccessAnimation day={day} onClose={() => { setShowSuccess(false); setSyncStage('idle'); }} />;
  }

  return (
    <Card className="border-amber-500/20 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950/90 shadow-2xl">
      <CardHeader>
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-amber-400" />
            <span>Submit Challenge Proof of Work</span>
          </CardTitle>
          <CardDescription>
            Provide your public GitHub repository & LinkedIn post link to prove submission and maintain your streak.
          </CardDescription>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Visible Sync Pipeline Progress Banner */}
        {syncStage !== 'idle' && (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-bold text-amber-400">Optimistic UI Sync Pipeline</span>
              <span className="text-[10px] text-slate-500 uppercase">{syncStage}</span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className={`flex items-center gap-2 ${(syncStage as string) !== 'idle' ? 'text-emerald-400' : 'text-slate-500'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>✓ Proof submitted (Optimistic Client Update)</span>
              </div>
              <div className={`flex items-center gap-2 ${syncStage === 'syncing' || syncStage === 'verified' ? 'text-amber-400' : 'text-slate-500'}`}>
                {syncStage === 'syncing' ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>Syncing with ABTalks Route Handler...</span>
              </div>
              {syncStage === 'verified' && (
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>✓ Server Verified & State Reconciled</span>
                </div>
              )}
              {syncStage === 'failed' && (
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>✖ Verification failed — Rollback Executed</span>
                </div>
              )}
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-white" />
            <span>GitHub Repository URL *</span>
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username/abtalks-day-12"
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 font-mono transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            <span>LinkedIn Post URL *</span>
          </label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/posts/username_day-12-completed"
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 font-mono transition-colors"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full font-bold py-3 text-sm flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{existingSubmission ? 'Update Code Proof' : 'Submit Day Challenge'}</span>
          </Button>
        </div>
      </form>
    </Card>
  );
}
