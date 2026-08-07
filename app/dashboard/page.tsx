'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Eye, User, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { SmartBanner } from '@/components/ui/smart-banner';
import { StreakCard } from '@/components/dashboard/streak-card';
import { Heatmap } from '@/components/dashboard/heatmap';
import { TaskCard } from '@/components/dashboard/task-card';
import { MomentumCard } from '@/components/dashboard/momentum-card';
import { WeeklyInsightCard } from '@/components/dashboard/weekly-insight-card';
import { AchievementsGrid } from '@/components/dashboard/achievements-grid';
import { JourneyTimeline } from '@/components/dashboard/journey-timeline';
import { RecruiterPreview } from '@/components/dashboard/recruiter-preview';
import { FixtureSwitcher } from '@/components/dashboard/fixture-switcher';
import { FSMVisualizer } from '@/components/dashboard/fsm-visualizer';
import { ConsistencyDNACard } from '@/components/dashboard/consistency-dna';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { storage } from '@/lib/storage';
import { DashboardViewModel } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const [studentId, setStudentId] = useState<string>('student-b');
  const [recruiterView, setRecruiterView] = useState<boolean>(false);
  const [viewModel, setViewModel] = useState<DashboardViewModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchViewModel = useCallback(async (id: string, isRecruiter: boolean) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/dashboard?studentId=${id}&recruiterView=${isRecruiter}`);
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
    fetchViewModel(activeId, recruiterView);
  }, [fetchViewModel, recruiterView]);

  const handleSelectStudent = (id: string) => {
    setStudentId(id);
    storage.setActiveStudentId(id);
    fetchViewModel(id, recruiterView);
  };

  const handleToggleRecruiter = (checked: boolean) => {
    setRecruiterView(checked);
    fetchViewModel(studentId, checked);
  };

  if (isLoading || !viewModel) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs font-semibold text-slate-400">Loading Dashboard ViewModel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Consistency Dashboard</h1>
            <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-bold">
              Day {viewModel.student.currentDay}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Welcome back, <strong className="text-slate-200">{viewModel.student.name}</strong> • Pure FSM ViewModel State
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
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

      {/* Smart Banner for Freeze, Recovery, or Warning */}
      <SmartBanner streak={viewModel.streak} onActionClick={() => router.push(`/day/${viewModel.student.currentDay}`)} />

      {recruiterView ? (
        /* Recruiter Mode View */
        <RecruiterPreview viewModel={viewModel} />
      ) : (
        /* Student Mode View */
        <div className="space-y-6">
          {/* FSM State Machine Interactive Diagram */}
          <FSMVisualizer currentState={viewModel.streak.state} />

          {/* Upper Grid Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StreakCard streak={viewModel.streak} />
            <MomentumCard momentum={viewModel.momentum} />
            <TaskCard task={viewModel.todayTask} submission={viewModel.todaySubmission} />
          </div>

          {/* Consistency DNA & AI Coach */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConsistencyDNACard dna={viewModel.dna} />
            <WeeklyInsightCard insight={viewModel.weeklyInsight.description} />
          </div>

          {/* Heatmap Section */}
          <Heatmap cells={viewModel.heatmap} currentDay={viewModel.student.currentDay} />

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
