import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  barClassName?: string;
}

export function Progress({ value, max = 100, className, barClassName, ...props }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full bg-slate-800/80 rounded-full h-2 overflow-hidden p-0.5 border border-slate-700/40', className)} {...props}>
      <div
        className={cn('h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500 ease-out', barClassName)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
