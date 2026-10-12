import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { CHARACTERS } from '../../data/characters';
import { getCharacterVisual } from '../../data/characterVisuals';
import { audio } from '../../utils/audio';

interface CoverScreenProps {
  onNext: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onNext }) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const handleStart = () => {
    audio.playClick();
    onNext();
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-between p-4 pb-8 max-w-lg mx-auto text-center">
      {/* Top Banner / Extra confetti sparkle hint */}
      <div className="w-full flex justify-center pt-2">
        <span className="inline-block px-4 py-1 rounded-full bg-amber-400/90 text-amber-950 font-black text-xs sm:text-sm shadow-sm border border-amber-300 animate-pulse">
          🌟 Petualangan Kurikulum Merdeka Kelas 4 SD 🌟
        </span>
      </div>

      {/* Center: Large Logo on Light Rounded Panel (so readable in dark mode) */}
      <div className="my-auto w-full flex flex-col items-center">
        <div className="w-full max-w-sm sm:max-w-md bg-white/95 dark:bg-white/95 rounded-3xl p-4 sm:p-6 shadow-[0_12px_32px_rgba(245,158,11,0.25)] border-4 border-amber-300 dark:border-amber-400 transition-transform hover:scale-[1.02]">
          <div className="relative min-h-[120px] flex items-center justify-center">
            <img
              src="/logo.png"
              alt="GAMBRENG - Ayo Belajar Bareng!"
              className="w-full max-h-44 sm:max-h-56 object-contain mx-auto transition-opacity duration-300"
              onLoad={() => {
                setLogoLoaded(true);
                setLogoFailed(false);
              }}
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.includes('src/assets/images')) {
                  img.src = '/src/assets/images/logo.png';
                } else {
                  setLogoFailed(true);
                }
              }}
            />

            {/* Fallback only shown if image truly failed both paths */}
            {logoFailed && !logoLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-400">
                <h1 className="font-heading text-3xl sm:text-4xl font-black text-amber-700">GAMBRENG</h1>
                <p className="text-sm font-bold text-amber-900 mt-1">Ayo Belajar Bareng!</p>
                <p className="text-xs text-amber-600 mt-2">
                  (File <code>logo.png</code> sedang dimuat...)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* The Five Characters bouncing gently */}
        <div className="mt-6 sm:mt-8 w-full">
          <div className="flex items-end justify-center gap-1 sm:gap-2.5 px-2">
            {CHARACTERS.map((char, index) => {
              const visual = getCharacterVisual(char.fileName);
              return (
                <div
                  key={char.id}
                  className="flex flex-col items-center transition-all duration-300 animate-gentle-bounce group"
                  style={{
                    animationDelay: `${index * 0.35}s`,
                  }}
                >
                  {/* Character Normal Image Element - Exactly identical visible height for all 5 characters */}
                  <div className="h-28 sm:h-36 w-16 sm:w-24 flex items-end justify-center filter drop-shadow-md overflow-visible">
                    <img
                      src={`/${char.fileName}`}
                      alt={char.name}
                      className="h-full w-auto max-w-none object-contain object-bottom origin-bottom transition-transform"
                      style={{
                        transform: `scale(${visual.standingScale}) translate(${visual.standingTranslateX}, ${visual.standingTranslateY})`,
                      }}
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.src.includes('src/assets/images')) {
                          img.src = `/src/assets/images/${char.fileName}`;
                        }
                      }}
                    />
                  </div>
                  {/* Name & Origin pill */}
                  <div className="mt-1 px-1.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-800 text-[10px] sm:text-xs font-black shadow-sm border border-amber-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                    {char.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom: Triangle "Next" Button */}
      <div className="w-full flex justify-center pt-4">
        <button
          onClick={handleStart}
          className="btn-chunky group relative flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white font-heading font-black text-xl sm:text-2xl px-10 py-4 rounded-3xl shadow-[0_8px_0_#c2410c] border-2 border-amber-300 active:translate-y-2 active:shadow-none transition-all w-full max-w-xs"
        >
          <span className="tracking-wide">Mulai Main</span>
          <div className="w-8 h-8 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </button>
      </div>
    </div>
  );
};
