import React, { useState } from 'react';
import { Github, Linkedin, Send, AlertCircle } from 'lucide-react';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation check
    if (!validateGithubUrl(githubUrl)) {
      setErrorMessage('Please enter a valid GitHub repository URL (e.g. https://github.com/username/repo)');
      return;
    }

    if (!validateLinkedinUrl(linkedinUrl)) {
      setErrorMessage('Please enter a valid LinkedIn post URL (e.g. https://linkedin.com/posts/username_post)');
      return;
    }

    setIsSubmitting(true);

    // Step 1: Immediate Optimistic Update
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

    try {
      // Step 2: POST /api/submissions
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

      // Step 3: Success -> Trigger celebration & keep state
      setShowSuccess(true);

      // Trigger Confetti milestone celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      onSuccess(data.viewModel, data.submission);
    } catch (err) {
      // Step 4: Failure -> Rollback optimistic update
      const msg = (err as Error).message || 'Failed to submit code proof';
      setErrorMessage(msg);
      onRollback(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return <SuccessAnimation day={day} onClose={() => setShowSuccess(false)} />;
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
