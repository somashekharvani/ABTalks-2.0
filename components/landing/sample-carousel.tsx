'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Github, Linkedin, CheckCircle2, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SampleSubmissionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const samples = [
    {
      student: 'Sarah Chen',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      day: 12,
      taskTitle: 'State Machine Streak Engine & Optimistic UI',
      streak: 11,
      feedback: 'Flawless FSM transition handling with pure TypeScript functions. Great job on optimistic UI rollback state!',
      githubUrl: 'https://github.com/sarahchen-code/abtalks-day-12',
      linkedinUrl: 'https://linkedin.com/posts/sarahchen_abtalks-day-12',
    },
    {
      student: 'Alex Rivera',
      role: 'Frontend Engineering Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      day: 1,
      taskTitle: 'HTML5 Semantic Foundations & Accessibility',
      streak: 1,
      feedback: 'Excellent accessible markup structure with WCAG AA compliance and ARIA attributes.',
      githubUrl: 'https://github.com/alexrivera-dev/abtalks-day-1',
      linkedinUrl: 'https://linkedin.com/posts/alexrivera_abtalks-day-1',
    },
    {
      student: 'Marcus Vance',
      role: 'Systems Architect in Training',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      day: 10,
      taskTitle: 'Zod Schema Parsing & Runtime Type Safety',
      streak: 10,
      feedback: 'Clean validation handlers with zero runtime exceptions. Highly production-ready implementation.',
      githubUrl: 'https://github.com/marcusvance-dev/abtalks-day-10',
      linkedinUrl: 'https://linkedin.com/posts/marcusvance_abtalks-day-10',
    },
  ];

  const current = samples[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? samples.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <Badge variant="amber">Proof of Work</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sample Verified Submissions</h2>
          <p className="text-xs text-slate-400">See real student submissions verified by the automated system</p>
        </div>

        <div className="relative">
          <Card className="p-6 sm:p-8 border-slate-800 bg-slate-900/90 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img src={current.avatar} alt={current.student} className="w-12 h-12 rounded-xl object-cover border border-amber-500/30" />
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    {current.student}
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-slate-400">{current.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="amber">Day {current.day}</Badge>
                <Badge variant="purple">Streak: {current.streak}d 🔥</Badge>
              </div>
            </div>

            <div className="py-4 space-y-3">
              <h5 className="text-sm font-bold text-slate-200">{current.taskTitle}</h5>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 italic flex items-start gap-2">
                <Quote className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{current.feedback}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <a href={current.githubUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-400 flex items-center gap-1 font-mono">
                  <Github className="w-3.5 h-3.5" /> GitHub Code
                </a>
                <a href={current.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn Post
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  aria-label="Previous sample"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-500 font-mono">
                  {currentIndex + 1} / {samples.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  aria-label="Next sample"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
