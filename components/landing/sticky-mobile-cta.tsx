import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-xl sm:hidden shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Flame className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">60-Day Challenge</p>
            <p className="text-[10px] text-slate-400">Built for Consistency</p>
          </div>
        </div>

        <Link href="/dashboard" className="shrink-0">
          <Button size="sm" className="font-bold px-4 py-2 text-xs">
            <span>Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
