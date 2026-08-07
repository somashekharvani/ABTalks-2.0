'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, ShieldCheck, Flame, RefreshCw } from 'lucide-react';
import { TaskDetails } from '@/components/challenge/task-details';
import { RequirementsChecklist } from '@/components/challenge/requirements-checklist';
import { SubmissionForm } from '@/components/challenge/submission-form';
import { PreviousSubmissionPreview } from '@/components/challenge/previous-submission';
import { SubmissionStatus } from '@/components/challenge/submission-status';
import { storage } from '@/lib/storage';
import { Task, Submission, DashboardViewModel } from '@/types';
import { TASKS } from '@/data/tasks';

export default function ChallengeDayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dayNumber = parseInt(id, 10) || 12;

  const [studentId, setStudentId] = useState<string>('student-b');
  const [task, setTask] = useState<Task | null>(null);
  const [submission, setSubmission] = useState<Submission | undefined>(undefined);
  const [viewModel, setViewModel] = useState<DashboardViewModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const activeId = storage.getActiveStudentId();
    setStudentId(activeId);

    const foundTask = TASKS.find((t) => t.day === dayNumber) || TASKS[11];
    setTask(foundTask);

    const subs = storage.getSubmissions(activeId);
    const existingSub = subs.find((s) => s.day === dayNumber);
    setSubmission(existingSub);

    fetch(`/api/dashboard?studentId=${activeId}`)
      .then((res) => res.json())
      .then((data) => setViewModel(data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [dayNumber]);

  const handleOptimisticSubmit = (tempSubmission: Submission) => {
    // Step 1: Immediate Optimistic Update
    setSubmission(tempSubmission);
  };

  const handleSuccess = (updatedViewModel: DashboardViewModel, verifiedSubmission: Submission) => {
    // Step 2: Keep state on success
    setViewModel(updatedViewModel);
    setSubmission(verifiedSubmission);
  };

  const handleRollback = () => {
    // Step 3: Rollback optimistic state on failure
    const subs = storage.getSubmissions(studentId);
    const existingSub = subs.find((s) => s.day === dayNumber);
    setSubmission(existingSub);
  };

  if (isLoading || !task) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs font-semibold text-slate-400">Loading Challenge Day {dayNumber}...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Day {dayNumber} of 60</span>
        </div>
      </div>

      {/* Real-time FSM Status Bar */}
      {viewModel && (
        <SubmissionStatus
          streakState={viewModel.streak.state}
          currentStreak={viewModel.streak.currentStreak}
          freezesRemaining={viewModel.streak.freezesRemaining}
        />
      )}

      {/* Task Details Header */}
      <TaskDetails task={task} />

      {/* Main Grid: Checklist & Submission Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RequirementsChecklist requirements={task.requirements} />

        <div className="space-y-6">
          <SubmissionForm
            day={dayNumber}
            studentId={studentId}
            existingSubmission={submission}
            onOptimisticSubmit={handleOptimisticSubmit}
            onSuccess={handleSuccess}
            onRollback={handleRollback}
          />

          {submission && submission.status === 'verified' && (
            <PreviousSubmissionPreview submission={submission} />
          )}
        </div>
      </div>
    </div>
  );
}
