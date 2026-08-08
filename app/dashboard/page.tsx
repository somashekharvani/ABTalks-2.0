'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, BookOpen, Layers, Trophy, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { SmartBanner } from '@/components/ui/smart-banner';
import { StreakCard } from '@/components/dashboard/streak-card';
import { Heatmap } from '@/components/dashboard/heatmap';
import { TaskCard } from '@/components/dashboard/task-card';
import { MomentumCard } from '@/components/dashboard/momentum-card';
import { AchievementsGrid } from '@/components/dashboard/achievements-grid';
import { JourneyTimeline } from '@/components/dashboard/journey-timeline';
import { RecruiterPreview } from '@/components/dashboard/recruiter-preview';
import { FixtureSwitcher } from '@/components/dashboard/fixture-switcher';
import { FSMVisualizer } from '@/components/dashboard/fsm-visualizer';
import { FSMPlayground } from '@/components/dashboard/fsm-playground';
import { ConsistencyDNACard } from '@/components/dashboard/consistency-dna';
import { AICoachIntelligenceCard } from '@/components/dashboard/ai-coach-intelligence';
import { TimeMachineController } from '@/components/dashboard/time-machine';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { NotificationBell } from '@/components/notifications/notification-bell';
import { CourseTracks } from '@/components/learning/course-tracks';
import { ProjectCard } from '@/components/projects/project-card';
import { ProjectPortfolio } from '@/components/projects/project-portfolio';
import { storage } from '@/lib/storage';
import { notificationEngine } from '@/lib/notification-engine';
import { COURSES } from '@/data/courses';
import { DashboardViewModel } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const [studentId, setStudentId] = useState<string>('student-b');
  const [recruiterView, setRecruiterView] = useState<boolean>(false);
  const [targetDay, setTargetDay] = useState<number | undefined>(undefined);
  const [viewModel, setViewModel] = useState<DashboardViewModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchViewModel = useCallback(async (id: string, isRecruiter: boolean, day?: number) => {
    setIsLoading(true);
    try {
      const dayQuery = day ? `&day=${day}` : '';
      const res = await fetch(`/api/dashboard?studentId=${id}&recruiterView=${isRecruiter}${dayQuery}`);
      if (res.ok) {
        const data: DashboardViewModel = await res.json();
        setViewModel(data);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const activeId = storage.getActiveStudentId();
    setStudentId(activeId);
    fetchViewModel(activeId, recruiterView, targetDay);
  }, [fetchViewModel, recruiterView, targetDay]);

  const handleSelectStudent = (id: string) => {
    setStudentId(id);
    setTargetDay(undefined);
    storage.setActiveStudentId(id);
    fetchViewModel(id, recruiterView, undefined);
  };

  const handleToggleRecruiter = (checked: boolean) => {
    setRecruiterView(checked);
    fetchViewModel(studentId, checked, targetDay);
  };

  const handleSelectTimeMachineDay = (day: number) => {
    setTargetDay(day);
    fetchViewModel(studentId, recruiterView, day);
  };

  const handleResetTimeMachine = () => {
    setTargetDay(undefined);
    fetchViewModel(studentId, recruiterView, undefined);
  };

  const handleMarkAllNotificationsRead = () => {
    if (!viewModel) return;
    const updated = notificationEngine.markAllAsRead(studentId);
    setViewModel({
      ...viewModel,
      notifications: updated,
      unreadNotificationsCount: 0,
    });
  };

  if (isLoading || !viewModel) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs font-semibold text-slate-400">Loading Dashboard ViewModel...</p>
      </div>
    );
  }

  const handleSelectTrack = (trackTitle: string) => {
    if (!viewModel) return;
    const updatedStudent = { ...viewModel.student, track: trackTitle };
    storage.saveStudent(updatedStudent);
    fetchViewModel(studentId, recruiterView, targetDay);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">

      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Consistency Dashboard</h1>
            <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-bold">
              Day {viewModel.viewDay} {viewModel.isSnapshotMode && '(Snapshot)'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Welcome back, <strong className="text-slate-200">{viewModel.student.name}</strong> • {viewModel.student.track} Track
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* In-App Notification Center Bell */}
          <NotificationBell
            notifications={viewModel.notifications}
            unreadCount={viewModel.unreadNotificationsCount}
            onMarkAllRead={handleMarkAllNotificationsRead}
          />

          <FixtureSwitcher currentStudentId={studentId} onSelectStudent={handleSelectStudent} />

          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <Switch
              checked={recruiterView}
              onCheckedChange={handleToggleRecruiter}
              label={recruiterView ? 'Recruiter Mode' : 'Student Mode'}
            />
          </div>
        </div>
      </div>

      {/* Contextual Motivation Quote Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-300 font-semibold shadow-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>"{viewModel.motivationQuote}"</span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">Learn ➔ Assess ➔ Build ➔ Prove</span>
      </div>

      {/* Time Machine Snapshot Rewind Bar */}
      <TimeMachineController
        currentDay={viewModel.student.currentDay}
        viewDay={viewModel.viewDay}
        isSnapshotMode={viewModel.isSnapshotMode}
        onSelectDay={handleSelectTimeMachineDay}
        onResetToCurrentDay={handleResetTimeMachine}
      />

      {/* Smart Banner for Freeze, Recovery, or Warning */}
      <SmartBanner streak={viewModel.streak} onActionClick={() => router.push(`/day/${viewModel.student.currentDay}`)} />

      {recruiterView ? (
        /* Recruiter Mode View */
        <div className="space-y-6">
          <RecruiterPreview viewModel={viewModel} />
          <ProjectPortfolio completedProjects={viewModel.completedProjects} activeProject={viewModel.activeProject} />
        </div>
      ) : (
        /* Student Mode View */
        <div className="space-y-6">
          {/* FSM State Machine Interactive Diagram */}
          <FSMVisualizer currentState={viewModel.streak.state} telemetry={viewModel.streak.telemetry} />

          {/* Interactive FSM Evaluator Playground */}
          <FSMPlayground />

          {/* AI Consistency Intelligence Engine */}
          <AICoachIntelligenceCard aiCoach={viewModel.aiCoach} />

          {/* Upper Grid Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StreakCard streak={viewModel.streak} />
            <MomentumCard momentum={viewModel.momentum} />
            <TaskCard task={viewModel.todayTask} submission={viewModel.todaySubmission} />
          </div>

          {/* Current 7-Day Project & Course Learning Track */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProjectCard
                project={viewModel.activeProject}
                milestone={viewModel.activeMilestone}
                currentDay={viewModel.viewDay}
              />
            </div>
            <div className="space-y-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" /> Learning Progress
                </span>
                <span className="text-amber-400 font-mono font-bold">
                  {viewModel.completedLessonsCount} / {viewModel.student.currentDay} Lessons
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-300 font-medium">
                  <span>Assessments Passed:</span>
                  <span className="text-emerald-400 font-bold">{viewModel.passedAssessmentsCount} / {viewModel.student.currentDay}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 font-medium pt-1 border-t border-slate-900">
                  <span>Projects Built:</span>
                  <span className="text-purple-300 font-bold">{viewModel.completedProjects.length + 1} Projects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Tracks */}
          <CourseTracks courses={COURSES} activeCourseId={viewModel.activeCourse.id} onSelectTrack={handleSelectTrack} />

          {/* Consistency DNA */}
          <ConsistencyDNACard dna={viewModel.dna} />

          {/* Heatmap Section */}
          <Heatmap cells={viewModel.heatmap} currentDay={viewModel.viewDay} onSelectDay={handleSelectTimeMachineDay} />

          {/* Project Portfolio */}
          <ProjectPortfolio completedProjects={viewModel.completedProjects} activeProject={viewModel.activeProject} />

          {/* Lower Grid: Achievements, Journey Timeline & Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AchievementsGrid achievements={viewModel.achievements} />
              <JourneyTimeline events={viewModel.journey} />
            </div>
            <div>
              <ActivityFeed items={viewModel.activityFeed} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
