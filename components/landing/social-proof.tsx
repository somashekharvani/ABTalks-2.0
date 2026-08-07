import React from 'react';
import { Users, Code, Award, CheckCircle } from 'lucide-react';

export function SocialProof() {
  const stats = [
    { icon: <Users className="w-5 h-5 text-amber-400" />, label: 'Active Students', value: '1,420+' },
    { icon: <Code className="w-5 h-5 text-emerald-400" />, label: 'Challenges Completed', value: '38,500+' },
    { icon: <Award className="w-5 h-5 text-purple-400" />, label: 'Verified Badges', value: '9,100+' },
    { icon: <CheckCircle className="w-5 h-5 text-blue-400" />, label: 'Completion Rate', value: '94.2%' },
  ];

  return (
    <section className="py-12 border-y border-slate-800/80 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by student developers building daily consistency across the globe
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center space-y-1">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.value}</div>
              <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
