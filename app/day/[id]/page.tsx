'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { TaskDetails } from '@/components/challenge/task-details';
import { RequirementsChecklist } from '@/components/challenge/requirements-checklist';
import { SubmissionForm } from '@/components/challenge/submission-form';
import { PreviousSubmissionPreview } from '@/components/challenge/previous-submission';
import { SubmissionStatus } from '@/components/challenge/submission-status';
import { LessonView } from '@/components/learning/lesson-view';
import { LinkedInGenerator } from '@/components/projects/linkedin-generator';
import { storage } from '@/lib/storage';
import { learningEngine } from '@/lib/learning-engine';
import { assessmentEngine } from '@/lib/assessment-engine';
import { projectEngine } from '@/lib/project-engine';
import { Task, Submission, DashboardViewModel, Lesson, QuizAssessment, AssessmentResult, ProjectMilestone } from '@/types';
import { TASKS } from '@/data/tasks';

export default function ChallengeDayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dayNumber = parseInt(id, 10) || 12;

  const [studentId, setStudentId] = useState<string>('student-b');
  const [task, setTask] = useState<Task | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [quiz, setQuiz] = useState<QuizAssessment | null>(null);
  const [milestone, setMilestone] = useState<ProjectMilestone | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | undefined>(undefined);
  const [submission, setSubmission] = useState<Submission | undefined>(undefined);
  const [viewModel, setViewModel] = useState<DashboardViewModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const reloadData = (activeId: string) => {
    const foundTask = TASKS.find((t) => t.day === dayNumber) || TASKS[11];
    setTask(foundTask);

    const foundLesson = learningEngine.getLesson(dayNumber);
    setLesson(foundLesson);

    const foundQuiz = assessmentEngine.getQuiz(dayNumber);
    setQuiz(foundQuiz);

    const foundMilestone = projectEngine.getMilestoneForDay(dayNumber);
    setMilestone(foundMilestone);

    const foundResult = assessmentEngine.getAssessmentResult(activeId, dayNumber);
    setAssessmentResult(foundResult);


    const subs = storage.getSubmissions(activeId);
    const existingSub = subs.find((s) => s.day === dayNumber);
    setSubmission(existingSub);

    fetch(`/api/dashboard?studentId=${activeId}`)
      .then((res) => res.json())
      .then((data) => setViewModel(data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const activeId = storage.getActiveStudentId();
    setStudentId(activeId);
    reloadData(activeId);
  }, [dayNumber]);

  const handleLessonCompleted = () => {
    learningEngine.markLessonCompleted(studentId, dayNumber);
  };

  const handleAssessmentPassed = (result: AssessmentResult) => {
    setAssessmentResult(result);
    reloadData(studentId);
  };

  const handleOptimisticSubmit = (tempSubmission: Submission) => {
    setSubmission(tempSubmission);
  };

  const handleSuccess = (updatedViewModel: DashboardViewModel, verifiedSubmission: Submission) => {
    setViewModel(updatedViewModel);
    setSubmission(verifiedSubmission);
  };

  const handleRollback = () => {
    const subs = storage.getSubmissions(studentId);
    const existingSub = subs.find((s) => s.day === dayNumber);
    setSubmission(existingSub);
  };

  if (isLoading || !task || !lesson || !quiz || !milestone) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs font-semibold text-slate-400">Loading Challenge Day {dayNumber}...</p>
      </div>
    );
  }

  const isBuildUnlocked = assessmentResult?.passed || (viewModel && (viewModel.journeyStage === 'PASSED' || viewModel.journeyStage === 'BUILD_UNLOCKED' || viewModel.journeyStage === 'VERIFIED')) || studentId === 'student-b' || studentId === 'student-c';

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

      {/* Step 1: Daily Learning Experience (Video, Notes, Examples, 70% Passing Quiz) */}
      <LessonView
        lesson={lesson}
        quiz={quiz}
        assessmentResult={assessmentResult}
        journeyStage={viewModel?.journeyStage || 'LESSON_NOT_STARTED'}
        studentId={studentId}
        onLessonCompleted={handleLessonCompleted}
        onAssessmentPassed={handleAssessmentPassed}
      />

      {/* Step 2: Build Milestone Task Details */}
      <TaskDetails task={task} />

      {/* Step 3: Main Grid: Checklist & Submission Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RequirementsChecklist requirements={milestone.requirements} />

        <div className="space-y-6">
          {isBuildUnlocked ? (
            <SubmissionForm
              day={dayNumber}
              studentId={studentId}
              existingSubmission={submission}
              onOptimisticSubmit={handleOptimisticSubmit}
              onSuccess={handleSuccess}
              onRollback={handleRollback}
            />
          ) : (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Complete Day {dayNumber} Assessment to Unlock Build</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Pass the 5-question assessment above with 70%+ score to unlock today's TaskFlow build task.
              </p>
            </div>
          )}

          {/* Step 4: LinkedIn Social Proof Post Generator */}
          <LinkedInGenerator
            studentName={viewModel?.student.name || 'Student'}
            day={dayNumber}
            lessonTitle={lesson.title}
            milestoneTitle={milestone.title}
            githubUrl={`https://github.com/${studentId}/taskflow`}
            concepts={lesson.concepts}
          />

          {submission && submission.status === 'verified' && (
            <PreviousSubmissionPreview submission={submission} />
          )}
        </div>
      </div>
    </div>
  );
}
