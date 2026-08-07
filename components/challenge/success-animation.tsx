import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Flame, Trophy, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SuccessAnimationProps {
  day: number;
  onClose: () => void;
}

export function SuccessAnimation({ day, onClose }: SuccessAnimationProps) {
  return (
    <Card className="border-emerald-500/40 bg-gradient-to-b from-emerald-950/60 via-slate-900 to-slate-950 p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center animate-bounce shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Proof Verified & Recorded!</span>
      </div>

      <h3 className="text-2xl font-black text-white tracking-tight">Day {day} Challenge Completed!</h3>
      <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
        Your GitHub repository and LinkedIn post have been verified. Your daily momentum score has increased and streak state is updated to ACTIVE!
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 pt-4 border-t border-slate-800">
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button size="md" className="w-full font-bold px-6">
            <span>View Dashboard Momentum</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
        <Button variant="secondary" size="md" onClick={onClose} className="w-full sm:w-auto">
          Edit Submission Links
        </Button>
      </div>
    </Card>
  );
}
