'use client';

import React, { useState } from 'react';
import { Bell, CheckCheck, X, ShieldCheck, Flame, BookOpen, Trophy } from 'lucide-react';
import { NotificationItem } from '@/types';
import { cn } from '@/lib/utils';

interface NotificationBellProps {
  notifications: NotificationItem[];
  unreadCount: number;
  onMarkAllRead: () => void;
}

export function NotificationBell({ notifications, unreadCount, onMarkAllRead }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
        aria-label="Notification Center"
      >
        <Bell className="w-4 h-4 text-amber-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-black flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 space-y-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-white">In-App Notification Center</h4>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllRead}
                  className="text-[10px] font-semibold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3 h-3" /> Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  'p-3 rounded-xl border text-xs space-y-1 transition-colors',
                  n.read ? 'bg-slate-950/40 border-slate-800/80 text-slate-400' : 'bg-amber-500/10 border-amber-500/30 text-slate-200 font-medium'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-xs">{n.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{n.timestamp}</span>
                </div>
                <p className="text-[11px] leading-snug">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
