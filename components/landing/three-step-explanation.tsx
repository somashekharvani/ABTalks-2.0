import React from 'react';
import { Terminal, Send, ShieldCheck } from 'lucide-react';

export function ThreeStepExplanation() {
  const steps = [
    {
      step: '01',
      title: 'Receive Daily Challenge',
      description: 'Get an architected daily engineering task covering System Design, React 19, Next.js 15, and API optimization.',
      icon: <Terminal className="w-6 h-6 text-amber-400" />,
    },
    {
      step: '02',
      title: 'Ship Code & Social Proof',
      description: 'Submit your public GitHub repository link and LinkedIn code post. Optimistic UI verifies and updates state instantly.',
      icon: <Send className="w-6 h-6 text-orange-400" />,
    },
    {
      step: '03',
      title: 'Build Verifiable Momentum',
      description: 'Watch your FSM streak grow, unlock milestone badges, and generate a recruiter-ready proof of work portfolio.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How ABTalks 2.0 Keeps You Consistent
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Three seamless steps to transform daily coding into an unstoppable engineering habit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="relative p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 shadow-xl group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <span className="text-3xl font-black font-mono text-slate-700 group-hover:text-amber-500/60 transition-colors">
                {s.step}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{s.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
