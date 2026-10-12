import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player, Subject, CategoryBadge } from '../../types/game';
import { CharacterAvatar } from '../common/CharacterAvatar';
import { audio } from '../../utils/audio';
import { Award, Trophy, Medal, Star, ArrowRight, FileCheck, Home } from 'lucide-react';

interface PodiumScreenProps {
  players: Player[];
  subject: Subject;
  onNavigateCertificates: () => void;
  onNavigateFinal: () => void;
  onNavigateHome?: () => void;
}

export const PodiumScreen: React.FC<PodiumScreenProps> = ({
  players,
  subject,
  onNavigateCertificates,
  onNavigateFinal,
  onNavigateHome,
}) => {
  useEffect(() => {
    audio.playVictory();
    // Confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // Determine Badge per player
  const getBadgeForPlayer = (player: Player, index: number): CategoryBadge => {
    if (index === 0) {
      return {
        id: 'cepat',
        name: 'Penjelajah Tercepat',
        icon: '⚡',
        color: 'bg-amber-100 text-amber-900 border-amber-300',
        description: 'Mencapai titik terjauh dengan ketangkasan luar biasa!',
      };
    }
    if (player.score >= 4 || index === 1) {
      return {
        id: 'bintang',
        name: 'Kolektor Bintang',
        icon: '⭐',
        color: 'bg-blue-100 text-blue-900 border-blue-300',
        description: 'Mengumpulkan bintang pengetahuan terbanyak!',
      };
    }
    if (player.challengesCompleted > 0 || index === 2) {
      return {
        id: 'tangguh',
        name: 'Paling Tangguh',
        icon: '🛡️',
        color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        description: 'Pantang menyerah menaklukkan setiap tantangan ilmu!',
      };
    }
    return {
      id: 'kompak',
      name: 'Kompak Abis',
      icon: '🤝',
      color: 'bg-pink-100 text-pink-900 border-pink-300',
      description: 'Sahabat bermain yang selalu ceria dan suportif!',
    };
  };

  const top1 = players[0];
  const top2 = players.length > 1 ? players[1] : null;
  const top3 = players.length > 2 ? players[2] : null;

  return (
    <div className="relative min-h-[calc(100vh-80px)] p-4 max-w-2xl mx-auto flex flex-col items-center justify-between pb-8">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs uppercase mb-2 shadow-sm animate-pulse">
          <Trophy className="w-4 h-4" />
          <span>Selamat Kepada Seluruh Juara!</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-800 dark:text-white">
          Urutan Juara GAMBRENG
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Mata Pelajaran: {subject.name}
        </p>
      </div>

      {/* Podium Display (Top 3 bouncing in) */}
      <div className="w-full flex items-end justify-center gap-2 sm:gap-4 my-4 px-2">
        {/* Juara 2 (Left) */}
        {top2 && (
          <div className="flex-1 flex flex-col items-center animate-bounce" style={{ animationDuration: '2.5s' }}>
            <CharacterAvatar
              fileName={top2.fileName}
              name={top2.nickname}
              size="md"
              ringColor={top2.color}
              className="mb-2 shadow-lg"
            />
            <span className="font-heading font-black text-xs sm:text-sm text-slate-800 dark:text-white truncate max-w-[90px] text-center">
              {top2.nickname}
            </span>
            <span className="text-[10px] font-bold text-slate-500">★ {top2.score} Poin</span>
            {/* Step 2 */}
            <div className="w-full h-24 sm:h-28 bg-gradient-to-t from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-t-2xl flex flex-col items-center justify-center border-t-4 border-slate-400 shadow-md">
              <span className="font-heading font-black text-2xl sm:text-3xl text-slate-700 dark:text-slate-200">
                2
              </span>
              <span className="text-[9px] font-black uppercase text-slate-600 dark:text-slate-300">
                Juara 2
              </span>
            </div>
          </div>
        )}

        {/* Juara 1 (Center - Tallest) */}
        {top1 && (
          <div className="flex-1 flex flex-col items-center animate-bounce z-10" style={{ animationDuration: '2.1s' }}>
            <div className="relative">
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xl filter drop-shadow">
                👑
              </span>
              <CharacterAvatar
                fileName={top1.fileName}
                name={top1.nickname}
                size="lg"
                ringColor={top1.color}
                className="mb-2 shadow-xl border-4 border-amber-400"
              />
            </div>
            <span className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white truncate max-w-[100px] text-center">
              {top1.nickname}
            </span>
            <span className="text-xs font-black text-amber-600 dark:text-amber-400">★ {top1.score} Poin</span>
            {/* Step 1 */}
            <div className="w-full h-32 sm:h-36 bg-gradient-to-t from-amber-400 to-yellow-300 rounded-t-2xl flex flex-col items-center justify-center border-t-4 border-amber-500 shadow-xl">
              <span className="font-heading font-black text-3xl sm:text-4xl text-amber-950">
                1
              </span>
              <span className="text-[10px] font-black uppercase text-amber-900">
                Juara 1
              </span>
            </div>
          </div>
        )}

        {/* Juara 3 (Right) */}
        {top3 && (
          <div className="flex-1 flex flex-col items-center animate-bounce" style={{ animationDuration: '2.8s' }}>
            <CharacterAvatar
              fileName={top3.fileName}
              name={top3.nickname}
              size="md"
              ringColor={top3.color}
              className="mb-2 shadow-lg"
            />
            <span className="font-heading font-black text-xs sm:text-sm text-slate-800 dark:text-white truncate max-w-[90px] text-center">
              {top3.nickname}
            </span>
            <span className="text-[10px] font-bold text-slate-500">★ {top3.score} Poin</span>
            {/* Step 3 */}
            <div className="w-full h-18 sm:h-20 bg-gradient-to-t from-amber-700 to-amber-600 text-white rounded-t-2xl flex flex-col items-center justify-center border-t-4 border-amber-800 shadow-md">
              <span className="font-heading font-black text-2xl text-amber-100">
                3
              </span>
              <span className="text-[9px] font-black uppercase text-amber-200">
                Juara 3
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Ranked List of All Players */}
      <div className="w-full bg-white/95 dark:bg-slate-900/95 rounded-3xl p-4 sm:p-5 shadow-xl border-3 border-amber-300 dark:border-slate-800 my-4 space-y-2.5">
        <h3 className="font-heading font-black text-sm text-slate-800 dark:text-white mb-2">
          Daftar Lengkap Peserta & Lencana:
        </h3>
        {players.map((player, idx) => {
          const badge = getBadgeForPlayer(player, idx);
          const isJuara = idx < 3;
          return (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-base w-6 text-center text-slate-600 dark:text-slate-300">
                  #{idx + 1}
                </span>
                <CharacterAvatar
                  fileName={player.fileName}
                  name={player.nickname}
                  size="sm"
                  ringColor={player.color}
                />
                <div>
                  <h4 className="font-heading font-black text-sm text-slate-800 dark:text-white">
                    {player.nickname}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{isJuara ? `Juara ${idx + 1}` : 'Sahabat Belajar'}</span>
                    <span>•</span>
                    <span className="text-amber-600 font-bold">★ {player.score} Poin</span>
                    <span>•</span>
                    <span>Petak {player.currentTile}</span>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className={`px-2.5 py-1 rounded-full text-xs font-black border flex items-center gap-1 ${badge.color}`}>
                <span>{badge.icon}</span>
                <span className="hidden sm:inline">{badge.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
        {onNavigateHome && (
          <button
            onClick={() => {
              audio.playClick();
              onNavigateHome();
            }}
            className="btn-chunky px-4 py-3.5 sm:py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading font-black text-sm border-2 border-amber-500 shadow-[0_4px_0_#d97706] flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </button>
        )}

        <button
          onClick={() => {
            audio.playClick();
            onNavigateCertificates();
          }}
          className="btn-chunky flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-heading font-black text-base sm:text-lg shadow-[0_6px_0_#c2410c] border border-amber-300"
        >
          <FileCheck className="w-5 h-5" />
          <span>Lihat & Unduh Sertifikat</span>
        </button>

        <button
          onClick={() => {
            audio.playClick();
            onNavigateFinal();
          }}
          className="btn-chunky px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-800 dark:text-white font-heading font-black text-sm border-2 border-slate-300 dark:border-slate-700 shadow-[0_4px_0_#cbd5e1]"
        >
          <span>Halaman Akhir →</span>
        </button>
      </div>
    </div>
  );
};
