import React from 'react';
import { UserCheck, Sparkles, Snowflake, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FixtureSwitcherProps {
  currentStudentId: string;
  onSelectStudent: (studentId: string) => void;
}

export function FixtureSwitcher({ currentStudentId, onSelectStudent }: FixtureSwitcherProps) {
  const fixtures = [
    {
      id: 'student-a',
      name: 'Student A',
      desc: 'Day 1 • Empty Heatmap',
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      id: 'student-b',
      name: 'Student B',
      desc: 'Day 12 • Freeze Consumed',
      icon: <Snowflake className="w-3.5 h-3.5 text-blue-400" />,
    },
    {
      id: 'student-c',
      name: 'Student C',
      desc: 'Day 12 • Recovery Mode',
      icon: <RefreshCw className="w-3.5 h-3.5 text-purple-400" />,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 backdrop-blur-md shadow-lg">
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-slate-400 text-xs font-semibold border-r border-slate-800">
        <UserCheck className="w-3.5 h-3.5 text-amber-500" />
        <span>Fixture:</span>
      </div>
      {fixtures.map((fx) => {
        const isSelected = currentStudentId === fx.id;
        return (
          <button
            key={fx.id}
            onClick={() => onSelectStudent(fx.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 select-none',
              isSelected
                ? 'bg-slate-800 text-white border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            )}
          >
            {fx.icon}
            <span className="font-bold">{fx.name}</span>
            <span className="hidden lg:inline text-[10px] text-slate-400">({fx.desc})</span>
          </button>
        );
      })}
    </div>
  );
}
