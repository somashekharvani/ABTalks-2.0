'use client';

import React from 'react';
import { Code2, Layers, Server, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/types';

interface CourseTracksProps {
  courses: Course[];
  activeCourseId: string;
  onSelectTrack?: (trackTitle: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-amber-400" />,
  Layers: <Layers className="w-5 h-5 text-purple-400" />,
  Server: <Server className="w-5 h-5 text-blue-400" />,
  Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
};

export function CourseTracks({ courses, activeCourseId, onSelectTrack }: CourseTracksProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
      <CardHeader>
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-400" />
            <span>Professional Learning Paths & Track System</span>
          </CardTitle>
          <CardDescription>Select a structured 60-day engineering learning path</CardDescription>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => {
          const isActive = course.id === activeCourseId;
          return (
            <div
              key={course.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all duration-200 ${
                isActive
                  ? 'bg-slate-800/80 border-amber-500/50 ring-1 ring-amber-500/30 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-80 hover:opacity-100 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {iconMap[course.badgeIcon] || <Code2 className="w-5 h-5" />}
                  </div>
                  {isActive && (
                    <Badge variant="amber">
                      <CheckCircle2 className="w-3 h-3" /> Active Track
                    </Badge>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white tracking-tight">{course.title}</h4>
                <p className="text-xs text-slate-400 leading-snug line-clamp-3">{course.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400 font-medium">
                  <span>{course.durationDays} Days</span>
                  <span>{course.totalProjects} Projects</span>
                </div>

                <Button
                  size="sm"
                  variant={isActive ? 'primary' : 'outline'}
                  onClick={() => onSelectTrack && onSelectTrack(course.title)}
                  className="w-full font-bold text-xs"
                >
                  <span>{isActive ? 'Continue Track' : 'Select Track'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
