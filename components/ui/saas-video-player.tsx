'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ShieldCheck, Youtube, Video, ExternalLink, List, CheckCircle2, Clock } from 'lucide-react';

interface SaaSVideoPlayerProps {
  title: string;
  duration: string;
  youtubeUrl?: string;
}

export function SaaSVideoPlayer({ title, duration, youtubeUrl }: SaaSVideoPlayerProps) {
  const [mode, setMode] = useState<'saas_stream' | 'youtube_iframe'>('saas_stream');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const cleanYoutubeUrl = youtubeUrl || 'https://www.youtube.com/embed/E45Ww1W93v4?rel=0';
  const directWatchUrl = cleanYoutubeUrl.replace('/embed/', '/watch?v=').replace('?rel=0', '');

  const chapters = [
    { time: '00:00', title: 'Course Introduction & Core Concepts' },
    { time: '04:15', title: 'Architectural Design & Setup' },
    { time: '12:30', title: 'Live Code Walkthrough & Implementation' },
    { time: '21:00', title: 'Testing & Automated Verification' },
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 space-y-3 overflow-hidden shadow-2xl">
      {/* Player Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-amber-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
            ⏱ {duration} HD Class
          </span>

          <button
            onClick={() => setMode(mode === 'saas_stream' ? 'youtube_iframe' : 'saas_stream')}
            className="text-[10px] font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
          >
            {mode === 'saas_stream' ? (
              <>
                <Youtube className="w-3.5 h-3.5 text-rose-500" /> Switch to YouTube Iframe
              </>
            ) : (
              <>
                <Video className="w-3.5 h-3.5 text-emerald-400" /> Switch to SaaS Stream
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group shadow-inner">
        {mode === 'youtube_iframe' ? (
          <div className="w-full h-full relative">
            <iframe
              src={cleanYoutubeUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Native HTML5 Video Stream */}
            <video
              ref={videoRef}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80"
              className="w-full h-full object-cover"
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-between p-4 opacity-95 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between text-xs text-white">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Guaranteed Active Video Stream
                </span>
                <span className="text-[10px] font-mono text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded-full">
                  1080p 60fps
                </span>
              </div>

              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/50 hover:scale-110 active:scale-95 transition-all"
                >
                  <Play className="w-6 h-6 fill-slate-950 ml-1" />
                </button>
              )}

              <div className="flex items-center justify-between gap-3 text-xs text-slate-200 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
                <button onClick={togglePlay} className="p-1.5 rounded-lg hover:bg-slate-800 text-amber-400 transition-colors">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-amber-400" />}
                </button>

                <div className="flex items-center gap-2 flex-1">
                  <span className="text-[10px] font-mono text-slate-400">00:00</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden cursor-pointer" onClick={togglePlay}>
                    <div className={`h-full bg-amber-500 rounded-full transition-all ${isPlaying ? 'w-2/3 animate-pulse' : 'w-1/3'}`} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  {[1.0, 1.25, 1.5, 2.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => changeSpeed(s)}
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        playbackSpeed === s ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}

                  <button onClick={toggleMute} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300">
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  <button onClick={toggleFullscreen} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300">
                    <Maximize className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Chapters & Direct Watch Action Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <List className="w-3 h-3 text-amber-400" /> Lesson Chapters
          </span>
          <div className="space-y-1">
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`flex items-center justify-between text-[11px] p-1 rounded cursor-pointer transition-colors ${
                  activeChapter === idx ? 'bg-slate-800 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{ch.title}</span>
                <span className="font-mono text-[10px]">{ch.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-2">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Youtube className="w-3 h-3 text-rose-500" /> Direct YouTube Link
            </span>
            <p className="text-[11px] text-slate-300 mt-1">
              If your browser blocks embedded iframes, open the full video lesson on YouTube in a new tab.
            </p>
          </div>

          <a
            href={directWatchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-[11px] transition-colors w-full"
          >
            <Youtube className="w-3.5 h-3.5 fill-white" />
            <span>Open Video Lesson on YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
