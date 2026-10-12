import React from 'react';
import { ScreenState } from '../../types/game';

interface GameBackgroundProps {
  screen: ScreenState;
  darkMode: boolean;
}

export const GameBackground: React.FC<GameBackgroundProps> = ({ screen, darkMode }) => {
  if (screen === 'certificates') {
    // Plain white background as specified for certificates
    return <div className="fixed inset-0 bg-slate-100 dark:bg-slate-900 pointer-events-none -z-10" />;
  }

  const isCover = screen === 'cover';
  const isMateri = screen === 'materi';
  const isGame = screen === 'game';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Sky Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          darkMode
            ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-emerald-950'
            : isCover
            ? 'bg-gradient-to-b from-sky-300 via-amber-100 to-emerald-100'
            : isMateri
            ? 'bg-gradient-to-b from-amber-50 via-amber-100/60 to-emerald-50'
            : isGame
            ? 'bg-gradient-to-b from-sky-100 via-amber-50/70 to-emerald-100/50'
            : 'bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100'
        }`}
      />

      {/* Sun / Moon */}
      <div
        className={`absolute top-6 right-8 transition-transform duration-1000 ${
          darkMode
            ? 'w-18 h-18 rounded-full bg-amber-100 shadow-[0_0_40px_rgba(254,240,138,0.65)] ring-4 ring-amber-200/30'
            : 'w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-[0_0_50px_rgba(251,191,36,0.5)]'
        } opacity-90`}
      >
        {darkMode && (
          <div className="absolute top-1 right-2.5 w-15 h-15 rounded-full bg-indigo-950" />
        )}
      </div>

      {/* Drifting Clouds & Tiny Kites (SVG) */}
      <div className="absolute top-12 left-6 w-36 h-12 opacity-70 animate-drift">
        <svg viewBox="0 0 100 40" fill={darkMode ? '#334155' : '#ffffff'} className="w-full h-full drop-shadow-sm">
          <path d="M 20 30 A 15 15 0 0 1 45 20 A 20 20 0 0 1 75 22 A 15 15 0 0 1 90 30 Z" />
        </svg>
      </div>

      <div className="absolute top-28 right-24 w-48 h-16 opacity-60 animate-drift" style={{ animationDelay: '-12s' }}>
        <svg viewBox="0 0 100 40" fill={darkMode ? '#1e293b' : '#ffffff'} className="w-full h-full drop-shadow-sm">
          <path d="M 15 32 A 14 14 0 0 1 40 22 A 22 22 0 0 1 72 20 A 16 16 0 0 1 92 32 Z" />
        </svg>
      </div>

      {/* Tiny colorful kite */}
      {!isGame && !darkMode && (
        <div className="absolute top-20 right-1/4 w-8 h-8 opacity-85 animate-bounce" style={{ animationDuration: '4s' }}>
          <svg viewBox="0 0 40 50" fill="none">
            <polygon points="20,0 35,20 20,40 5,20" fill="#f43f5e" />
            <polygon points="20,0 20,40 5,20" fill="#fb7185" />
            <path d="M 20 40 Q 25 45 20 50" stroke="#f59e0b" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )}

      {/* Floating stars & playful dots in night & day sky */}
      <div className={`absolute inset-0 ${darkMode ? 'opacity-90' : 'opacity-40'}`}>
        {[
          { x: '10%', y: '15%', s: darkMode ? 'text-amber-200 text-base' : 'text-amber-300 text-sm', char: '✦' },
          { x: '82%', y: '22%', s: darkMode ? 'text-amber-100 text-sm' : 'text-pink-300 text-xs', char: '★' },
          { x: '42%', y: '10%', s: darkMode ? 'text-yellow-200 text-lg' : 'text-sky-300 text-base', char: '✦' },
          { x: '68%', y: '30%', s: darkMode ? 'text-amber-300 text-sm' : 'text-emerald-300 text-xs', char: '★' },
          { x: '24%', y: '28%', s: darkMode ? 'text-yellow-100 text-base' : 'text-amber-400 text-sm', char: '✦' },
          { x: '90%', y: '14%', s: darkMode ? 'text-amber-200 text-xs' : 'text-purple-300 text-xs', char: '✦' },
          { x: '55%', y: '20%', s: darkMode ? 'text-yellow-300 text-sm' : 'text-pink-300 text-xs', char: '★' },
          { x: '18%', y: '40%', s: darkMode ? 'text-amber-100 text-xs' : 'text-sky-300 text-xs', char: '✦' },
        ].map((star, i) => (
          <span
            key={i}
            className={`absolute ${star.s} select-none animate-pulse drop-shadow`}
            style={{ left: star.x, top: star.y, animationDelay: `${i * 0.5}s` }}
          >
            {star.char}
          </span>
        ))}
      </div>

      {/* Layered Rolling Green Hills & Rice Terraces at Bottom (Under 20KB SVG) */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-56 pointer-events-none">
        <svg
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Back distant hills */}
          <path
            d="M 0 150 Q 250 80 500 140 T 1000 120 Q 1120 150 1200 180 L 1200 300 L 0 300 Z"
            fill={darkMode ? '#064e3b' : '#a7f3d0'}
            opacity="0.6"
          />

          {/* Middle hill with terrace lines */}
          <path
            d="M 0 180 Q 300 120 650 190 T 1200 170 L 1200 300 L 0 300 Z"
            fill={darkMode ? '#022c22' : '#34d399'}
            opacity="0.75"
          />

          {/* Forefront rolling green field */}
          <path
            d="M 0 220 Q 400 170 850 230 T 1200 210 L 1200 300 L 0 300 Z"
            fill={darkMode ? '#06201b' : '#10b981'}
          />

          {/* Rice terrace curved decorative lines */}
          <path
            d="M 50 240 Q 300 210 600 250 M 650 245 Q 900 220 1150 235"
            stroke={darkMode ? '#065f46' : '#059669'}
            strokeWidth="3"
            fill="none"
            opacity="0.5"
          />

          {/* Tiny traditional village hut silhouette */}
          <g transform="translate(180, 195) scale(0.65)" opacity={darkMode ? '0.6' : '0.85'}>
            <polygon points="30,0 0,25 60,25" fill="#78350f" />
            <rect x="10" y="25" width="40" height="25" fill="#92400e" />
            <rect x="25" y="35" width="10" height="15" fill="#451a03" />
          </g>

          {/* Tiny coconut trees */}
          <g transform="translate(1020, 160) scale(0.6)" opacity={darkMode ? '0.5' : '0.85'}>
            <path d="M 25 70 Q 20 40 30 15" stroke="#78350f" strokeWidth="5" fill="none" />
            <path d="M 30 15 Q 5 5 0 25 M 30 15 Q 20 -5 10 -15 M 30 15 Q 50 -5 55 -15 M 30 15 Q 55 5 60 25" stroke="#047857" strokeWidth="4" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
};
