import React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Switch({ checked, onCheckedChange, label, className }: SwitchProps) {
  return (
    <label className={cn('inline-flex items-center gap-2.5 cursor-pointer select-none', className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            'w-11 h-6 rounded-full transition-colors duration-200 ease-in-out border border-slate-700',
            checked ? 'bg-amber-500 border-amber-400' : 'bg-slate-800'
          )}
        >
          <div
            className={cn(
              'w-4 h-4 rounded-full bg-slate-100 transform transition-transform duration-200 ease-in-out mt-0.5 ml-0.5 shadow-md',
              checked ? 'translate-x-5 bg-black' : 'translate-x-0'
            )}
          />
        </div>
      </div>
      {label && <span className="text-xs font-medium text-slate-300">{label}</span>}
    </label>
  );
}
