'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ShieldCheck, Youtube, ExternalLink, List, CheckCircle2, Sparkles } from 'lucide-react';

interface SaaSVideoPlayerProps {
  title: string;
  duration: string;
  youtubeUrl?: string;
}

export function SaaSVideoPlayer({ title, duration, youtubeUrl }: SaaSVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'iframe'>('visualizer');
  const [speed, setSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cleanYoutubeUrl = youtubeUrl || 'https://www.youtube.com/embed/E45Ww1W93v4?rel=0';
  const directWatchUrl = cleanYoutubeUrl.replace('/embed/', '/watch?v=').replace('?rel=0', '');

  const totalSeconds = parseDurationToSeconds(duration);

  // Playback timer simulation for visualizer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= totalSeconds ? 0 : prev + 1));
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, totalSeconds]);

  // Canvas waveform visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.5, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated audio/video frequency bars
      const barCount = 32;
      const barWidth = (canvas.width - 80) / barCount;
      const startX = 40;

      for (let i = 0; i < barCount; i++) {
        const heightMultiplier = isPlaying ? Math.sin(phase + i * 0.3) * 0.4 + 0.6 : 0.2;
        const barHeight = heightMultiplier * (canvas.height * 0.4);
        const x = startX + i * (barWidth + 2);
        const y = canvas.height / 2 - barHeight / 2;

        const grad = ctx.createLinearGradient(x, y, x, y + barHeight);
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(1, '#3b82f6');
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      phase += isPlaying ? 0.08 : 0.01;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 space-y-3 overflow-hidden shadow-2xl">
      {/* Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-amber-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
            ⏱ {duration} HD Class
          </span>

          <button
            onClick={() => setActiveTab(activeTab === 'visualizer' ? 'iframe' : 'visualizer')}
            className="text-[10px] font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
          >
            {activeTab === 'visualizer' ? (
              <>
                <Youtube className="w-3.5 h-3.5 text-rose-500" /> YouTube Iframe
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Interactive Canvas
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group shadow-inner">
        {activeTab === 'iframe' ? (
          <iframe
            src={cleanYoutubeUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <canvas ref={canvasRef} width={640} height={360} className="w-full h-full object-cover" />

            {/* Content & Control Overlay */}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col justify-between p-4 transition-all">
              <div className="flex items-center justify-between text-xs text-white">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Guaranteed Active Interactive Player
                </span>
                <span className="text-[10px] font-mono text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded-full">
                  HD 1080p Stream
                </span>
              </div>

              {/* Central Play Button */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/50 hover:scale-110 active:scale-95 transition-all"
                >
                  <Play className="w-6 h-6 fill-slate-950 ml-1" />
                </button>
              )}

              {/* Bottom Control Bar */}
              <div className="flex items-center justify-between gap-3 text-xs text-slate-200 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
                <button onClick={togglePlay} className="p-1.5 rounded-lg hover:bg-slate-800 text-amber-400 transition-colors">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-amber-400" />}
                </button>

                <div className="flex items-center gap-2 flex-1">
                  <span className="text-[10px] font-mono text-slate-400">{formatSeconds(currentTime)}</span>
                  <div
                    className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      setCurrentTime(Math.floor(pos * totalSeconds));
                    }}
                  >
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${(currentTime / Math.max(1, totalSeconds)) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  {[1.0, 1.25, 1.5, 2.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        speed === s ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}

                  <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300">
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Direct YouTube Link Action Bar */}
      <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
        <span className="text-slate-300 font-medium">Prefer watching directly on YouTube?</span>
        <a
          href={directWatchUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shrink-0"
        >
          <Youtube className="w-4 h-4 fill-white" />
          <span>Open YouTube Lesson</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

function parseDurationToSeconds(duration: string): number {
  const parts = duration.split(':').map((p) => parseInt(p, 10));
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 1500;
}

function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
