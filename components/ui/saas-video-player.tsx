'use client';

import React, { useState } from 'react';
import { Play, Youtube, ShieldCheck, ExternalLink, Video } from 'lucide-react';

interface SaaSVideoPlayerProps {
  title: string;
  duration: string;
  youtubeUrl?: string;
}

export function SaaSVideoPlayer({ title, duration, youtubeUrl }: SaaSVideoPlayerProps) {
  const [embedFailed, setEmbedFailed] = useState(false);

  const fallbackUrl = youtubeUrl || 'https://www.youtube.com/embed/m_g00jX2Wvw?rel=0';

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 space-y-3 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-amber-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
            ⏱ {duration} HD Lesson
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-lg flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Active Video Class
          </span>
        </div>
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group shadow-inner">
        {!embedFailed ? (
          <iframe
            src={fallbackUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onError={() => setEmbedFailed(true)}
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-center space-y-3">
            <div className="p-3.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Youtube className="w-8 h-8 text-rose-500" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">{title}</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Watch the full video class lesson on YouTube or use the starter template repository.
              </p>
            </div>

            <a
              href={fallbackUrl.replace('/embed/', '/watch?v=')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg transition-colors"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Open Video Lesson on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
