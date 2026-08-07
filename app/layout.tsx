import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Flame, LayoutDashboard, Calendar, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ABTalks 2.0 — Built for Consistency',
  description: 'The 60-Day Developer Challenge engineered with state-machine streak protection, non-punitive recovery paths, and verified GitHub proof-of-work.',
  keywords: ['ABTalks', 'Developer Challenge', 'Consistency Engine', 'Next.js 15', 'FSM Streak'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#090d16] text-slate-100 min-h-screen flex flex-col selection:bg-amber-500 selection:text-black">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-black shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5 font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                  ABTalks <span className="text-amber-400 text-xs px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">2.0</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Built for Consistency</span>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center gap-1.5 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/day/12"
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center gap-1.5 transition-colors"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Day 12</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-slate-300">ABTalks 2.0</span>
              <span>— Deterministic FSM Consistency Engine</span>
            </div>
            <p className="text-slate-400">© 2026 ABTalks. Built with Next.js 15, React 19 & Tailwind CSS v4.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
