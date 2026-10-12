import React from 'react';
import { Subject } from '../../types/game';
import { BookOpen, Gamepad2, ArrowLeft } from 'lucide-react';
import { audio } from '../../utils/audio';

interface SubjectActionScreenProps {
  subject: Subject;
  onNavigateMateri: () => void;
  onNavigatePlay: () => void;
  onChangeSubject: () => void;
}

export const SubjectActionScreen: React.FC<SubjectActionScreenProps> = ({
  subject,
  onNavigateMateri,
  onNavigatePlay,
  onChangeSubject,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 max-w-lg mx-auto">
      <div className="w-full bg-white/95 dark:bg-slate-900/95 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 dark:border-amber-500/50 text-center backdrop-blur-sm">
        {/* Back Link */}
        <button
          onClick={() => {
            audio.playClick();
            onChangeSubject();
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ganti Mata Pelajaran</span>
        </button>

        {/* Selected Subject Banner */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-inner mb-3 border-2 border-white"
            style={{ backgroundColor: `${subject.color}25` }}
          >
            {subject.icon}
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Mata Pelajaran Terpilih
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mt-1">
            {subject.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
            {subject.description}
          </p>
        </div>

        {/* Two Big Buttons: "Materi" and "Main Yuk" */}
        <div className="flex flex-col gap-4 w-full">
          {/* Main Yuk (Primary Play) */}
          <button
            onClick={() => {
              audio.playClick();
              onNavigatePlay();
            }}
            className="btn-chunky group flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-heading font-black text-xl sm:text-2xl p-5 rounded-3xl shadow-[0_8px_0_#065f46] border-2 border-emerald-300 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner text-3xl group-hover:scale-110 transition-transform">
                🎲
              </div>
              <div>
                <span className="block leading-tight">Main Yuk</span>
                <span className="block text-xs sm:text-sm font-sans font-bold text-emerald-100 opacity-90 mt-0.5">
                  Mulai petualangan papan & kumpulkan poin
                </span>
              </div>
            </div>
            <Gamepad2 className="w-7 h-7 text-emerald-100 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Materi (Reading & Preparation) */}
          <button
            onClick={() => {
              audio.playClick();
              onNavigateMateri();
            }}
            className="btn-chunky group flex items-center justify-between bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-heading font-black text-xl sm:text-2xl p-5 rounded-3xl shadow-[0_8px_0_#b45309] border-2 border-amber-200 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center shadow-inner text-3xl group-hover:scale-110 transition-transform">
                📚
              </div>
              <div>
                <span className="block leading-tight">Materi</span>
                <span className="block text-xs sm:text-sm font-sans font-bold text-amber-900/80 mt-0.5">
                  Pelajari topik Semester Ganjil & Genap
                </span>
              </div>
            </div>
            <BookOpen className="w-7 h-7 text-amber-900 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
