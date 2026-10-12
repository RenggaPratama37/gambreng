import React from 'react';
import { Subject } from '../../types/game';
import { audio } from '../../utils/audio';
import {
  RotateCcw,
  Compass,
  BookOpen,
  Award,
  Home,
  Sparkles,
} from 'lucide-react';

interface FinalScreenProps {
  subject: Subject;
  onPlayAgain: () => void;
  onChangeSubject: () => void;
  onViewMateri: () => void;
  onPrintCertificate: () => void;
  onBackHome: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  subject,
  onPlayAgain,
  onChangeSubject,
  onViewMateri,
  onPrintCertificate,
  onBackHome,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] p-4 max-w-lg mx-auto flex flex-col items-center justify-center pb-12 select-none">
      <div className="w-full bg-white/95 dark:bg-slate-900/95 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 dark:border-amber-500/50 text-center backdrop-blur-sm">
        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs font-black mb-3">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Permainan Selesai dengan Hebat!</span>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mb-2 leading-tight">
          Apa yang Ingin Kamu Lakukan Sekarang?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
          Mata pelajaran yang baru saja kamu selesaikan: <strong>{subject.name}</strong>.
        </p>

        {/* 5 Big Chunky Buttons */}
        <div className="flex flex-col gap-3.5 w-full">
          {/* 1. Main Lagi */}
          <button
            onClick={() => {
              audio.playClick();
              onPlayAgain();
            }}
            className="btn-chunky flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-heading font-black text-base sm:text-lg shadow-[0_5px_0_#065f46] border border-emerald-300 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                🎲
              </div>
              <div>
                <span className="block leading-tight">Main Lagi</span>
                <span className="text-[11px] font-sans font-bold text-emerald-100 opacity-90 block">
                  Ulangi permainan dengan regu yang sama
                </span>
              </div>
            </div>
            <RotateCcw className="w-5 h-5 text-emerald-100" />
          </button>

          {/* 2. Ganti Mapel */}
          <button
            onClick={() => {
              audio.playClick();
              onChangeSubject();
            }}
            className="btn-chunky flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-heading font-black text-base sm:text-lg shadow-[0_5px_0_#b45309] border border-amber-200 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-xl">
                🧭
              </div>
              <div>
                <span className="block leading-tight">Ganti Mapel</span>
                <span className="text-[11px] font-sans font-bold text-amber-900/80 block">
                  Coba tantangan di mata pelajaran lain
                </span>
              </div>
            </div>
            <Compass className="w-5 h-5 text-amber-900" />
          </button>

          {/* 3. Lihat Materi */}
          <button
            onClick={() => {
              audio.playClick();
              onViewMateri();
            }}
            className="btn-chunky flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-800 dark:text-white font-heading font-black text-base shadow-[0_4px_0_rgba(0,0,0,0.1)] border-2 border-slate-300 dark:border-slate-700 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-slate-700 flex items-center justify-center text-xl text-amber-600">
                📚
              </div>
              <div>
                <span className="block leading-tight">Lihat Materi</span>
                <span className="text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400 block">
                  Baca kembali rangkuman konsep & cerita
                </span>
              </div>
            </div>
            <BookOpen className="w-5 h-5 text-slate-400" />
          </button>

          {/* 4. Cetak Sertifikat */}
          <button
            onClick={() => {
              audio.playClick();
              onPrintCertificate();
            }}
            className="btn-chunky flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-800 dark:text-white font-heading font-black text-base shadow-[0_4px_0_rgba(0,0,0,0.1)] border-2 border-slate-300 dark:border-slate-700 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-slate-700 flex items-center justify-center text-xl text-sky-600">
                🎓
              </div>
              <div>
                <span className="block leading-tight">Cetak Sertifikat</span>
                <span className="text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400 block">
                  Unduh atau cetak sertifikat para juara
                </span>
              </div>
            </div>
            <Award className="w-5 h-5 text-slate-400" />
          </button>

          {/* 5. Kembali ke Beranda */}
          <button
            onClick={() => {
              audio.playClick();
              onBackHome();
            }}
            className="btn-chunky flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-heading font-black text-base shadow-[0_4px_0_rgba(0,0,0,0.06)] border border-slate-300 dark:border-slate-700 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl">
                🏡
              </div>
              <div>
                <span className="block leading-tight">Kembali ke Beranda</span>
                <span className="text-[11px] font-sans font-bold text-slate-500 block">
                  Menuju halaman depan GAMBRENG
                </span>
              </div>
            </div>
            <Home className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
