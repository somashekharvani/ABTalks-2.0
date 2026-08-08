'use client';

import React, { useState } from 'react';
import { BookOpen, Video, FileText, Code2, Brain, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lesson, QuizAssessment, AssessmentResult, DailyJourneyStage } from '@/types';
import { AssessmentModal } from './assessment';

interface LessonViewProps {
  lesson: Lesson;
  quiz: QuizAssessment;
  assessmentResult?: AssessmentResult;
  journeyStage: DailyJourneyStage;
  studentId: string;
  onLessonCompleted: () => void;
  onAssessmentPassed: (result: AssessmentResult) => void;
}

export function LessonView({
  lesson,
  quiz,
  assessmentResult,
  journeyStage,
  studentId,
  onLessonCompleted,
  onAssessmentPassed,
}: LessonViewProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'examples'>('notes');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const isPassed = assessmentResult?.passed || journeyStage === 'PASSED' || journeyStage === 'BUILD_UNLOCKED' || journeyStage === 'VERIFIED';

  return (
    <>
      <Card className="border-slate-800 bg-slate-900/90 shadow-xl space-y-4">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="amber">Day {lesson.day} Lesson</Badge>
              <Badge variant="default">{lesson.durationMinutes} mins</Badge>
            </div>
            {isPassed ? (
              <Badge variant="green" className="font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Assessment Passed ({assessmentResult?.scorePercent || 80}%)
              </Badge>
            ) : (
              <Badge variant="outline">Learn ➔ Assess ➔ Build</Badge>
            )}
          </div>

          <CardTitle className="text-xl font-bold text-white mt-1">{lesson.title}</CardTitle>
          <CardDescription className="text-xs text-slate-300">{lesson.description}</CardDescription>
        </CardHeader>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'notes' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" /> Notes & Concepts
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'examples' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-purple-400" /> Code Examples
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'video' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-blue-400" /> Video Lesson
          </button>
        </div>

        {/* Content Views */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
          {activeTab === 'notes' && (
            <div className="space-y-3">
              <div className="prose prose-invert max-w-none text-xs leading-relaxed whitespace-pre-line">
                {lesson.notes}
              </div>
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 font-semibold">Key Concepts:</span>
                {lesson.concepts.map((c, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[11px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-3">
              {lesson.examples.map((ex, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h5 className="font-bold text-amber-300">{ex.title}</h5>
                  <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto">
                    {ex.code}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'video' && (
            <div className="space-y-2">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* Assessment Trigger Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Passing Score: <strong className="text-emerald-400 font-mono">70%</strong> • Rule: Quiz failure does <strong className="text-white">NOT</strong> break streak.
          </div>

          <Button
            onClick={() => {
              onLessonCompleted();
              setIsAssessmentOpen(true);
            }}
            className="w-full sm:w-auto font-bold gap-2 text-xs py-2.5 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-orange-500/20"
          >
            <Brain className="w-4 h-4 text-black" />
            <span>{isPassed ? 'Retake Assessment' : 'Start Day 12 Assessment'}</span>
          </Button>
        </div>
      </Card>

      {/* 5-Question Quiz Assessment Modal */}
      {isAssessmentOpen && (
        <AssessmentModal
          quiz={quiz}
          studentId={studentId}
          onClose={() => setIsAssessmentOpen(false)}
          onSuccess={(result) => {
            onAssessmentPassed(result);
            setIsAssessmentOpen(false);
          }}
        />
      )}
    </>
  );
}
