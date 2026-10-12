import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Home, GraduationCap, X, Check, School } from 'lucide-react';
import { ScreenState } from '../../types/game';
import { audio } from '../../utils/audio';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface HeaderProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  schoolName: string;
  teacherName: string;
  onUpdateSchoolAndTeacher: (school: string, teacher: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  schoolName,
  teacherName,
  onUpdateSchoolAndTeacher,
}) => {
  const [isMuted, setIsMuted] = useState(audio.isMuted);
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [tempSchoolName, setTempSchoolName] = useState(schoolName);
  const [tempTeacherName, setTempTeacherName] = useState(teacherName);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleSoundToggle = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
  };

  const handleGoHome = () => {
    audio.playClick();
    onNavigate('cover');
  };

  const handleOpenSchoolModal = () => {
    audio.playClick();
    setTempSchoolName(schoolName);
    setTempTeacherName(teacherName);
    setSaveSuccess(false);
    setShowSchoolModal(true);
  };

  const handleSaveSchoolAndTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playClick();
    const finalSchool = tempSchoolName.trim() || 'SD Negeri Merdeka 01';
    const finalTeacher = tempTeacherName.trim() || 'Bapak / Ibu Guru Pembimbing';
    onUpdateSchoolAndTeacher(finalSchool, finalTeacher);
    setSaveSuccess(true);
    setTimeout(() => {
      setShowSchoolModal(false);
      setSaveSuccess(false);
    }, 1000);
  };

  const isGameScreen = currentScreen === 'game';
  const isCoverScreen = currentScreen === 'cover';
  const isCertificateScreen = currentScreen === 'certificates';

  return (
    <header className="relative z-40 w-full px-3 sm:px-4 py-2.5 flex items-center justify-between no-print max-w-5xl mx-auto">
      {/* Top Left: Logo & Beranda Button linking to cover */}
      <div className="flex items-center gap-2">
        {!isCoverScreen && !isGameScreen && !isCertificateScreen && (
          <button
            onClick={handleGoHome}
            title="Kembali ke Beranda"
            className="group flex items-center bg-white/95 dark:bg-slate-900/95 rounded-2xl p-1.5 px-2.5 shadow-md border-2 border-amber-300 dark:border-amber-400 hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="h-9 w-28 sm:h-11 sm:w-36 flex items-center justify-center">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="GAMBRENG"
                  className="max-h-full max-w-full object-contain"
                  onLoad={() => setLogoError(false)}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('src/assets/images')) {
                      img.src = '/src/assets/images/logo.png';
                    } else {
                      setLogoError(true);
                    }
                  }}
                />
              ) : (
                <div className="text-center leading-none">
                  <span className="font-heading font-black text-xs text-amber-600 dark:text-amber-400 block">GAMBRENG</span>
                  <span className="text-[7px] text-slate-500 dark:text-slate-300">Beranda</span>
                </div>
              )}
            </div>
          </button>
        )}

        {/* Dedicated "Beranda" Menu button on every page except Cover */}
        {!isCoverScreen && (
          <button
            onClick={handleGoHome}
            title="Kembali ke Beranda"
            className="btn-chunky flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading font-black text-xs sm:text-sm border-2 border-amber-500 shadow-[0_3px_0_#d97706] active:translate-y-1 transition-all"
          >
            <Home className="w-4 h-4 text-amber-950" />
            <span>Beranda</span>
          </button>
        )}

        {/* Menu Sekolah & Guru Button */}
        <button
          onClick={handleOpenSchoolModal}
          title="Pengaturan Menu Sekolah & Nama Guru"
          className="btn-chunky flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-amber-200 border-2 border-amber-300 dark:border-amber-400 text-xs sm:text-sm font-black shadow-[0_2px_0_rgba(0,0,0,0.1)] hover:bg-amber-50 dark:hover:bg-slate-850 transition-all"
        >
          <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="hidden sm:inline max-w-[130px] truncate">{schoolName}</span>
          <span className="sm:hidden">Sekolah</span>
        </button>
      </div>

      {/* Top Right Controls: PWA Install, Audio Toggle, Dark Mode */}
      <div className="flex items-center gap-2">
        {/* PWA Install Button */}
        {!isInstalled && isInstallable && (
          <button
            onClick={install}
            className="btn-chunky flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-black px-3 py-1.5 rounded-xl shadow-[0_3px_0_#059669] border border-emerald-400"
          >
            <span>📲</span>
            <span className="hidden sm:inline">Pasang</span>
          </button>
        )}

        {!isInstalled && isIOS && (
          <button
            onClick={() => setShowIOSModal(true)}
            className="btn-chunky flex items-center gap-1 bg-sky-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-[0_3px_0_#0284c7]"
          >
            <span>📲</span>
            <span>iOS</span>
          </button>
        )}

        {/* Audio Toggle */}
        <button
          onClick={handleSoundToggle}
          title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
          className={`btn-chunky p-2 rounded-xl border-2 transition-all shadow-[0_3px_0_rgba(0,0,0,0.15)] ${
            isMuted
              ? 'bg-white/90 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              : 'bg-amber-400 text-amber-950 border-amber-500 shadow-[0_3px_0_#d97706]'
          }`}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          title={darkMode ? 'Ubah ke Mode Siang' : 'Ubah ke Mode Malam'}
          className="btn-chunky p-2 rounded-xl bg-white/90 dark:bg-slate-900 text-slate-800 dark:text-amber-300 border-2 border-slate-300 dark:border-amber-400/50 shadow-[0_3px_0_rgba(0,0,0,0.15)] hover:scale-105"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>
      </div>

      {/* Modal Menu Sekolah & Guru */}
      {showSchoolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border-4 border-amber-400 dark:border-amber-500 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl">
                  🏫
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-black text-slate-900 dark:text-white leading-tight">
                    Pengaturan Sekolah & Guru
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                    Data ini otomatis tercetak pada sertifikat siswa
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSchoolModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSchoolAndTeacher} className="space-y-4">
              {/* Menu Sekolah: Bisa diisi nama sekolah apa saja */}
              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <School className="w-4 h-4 text-amber-500" />
                  <span>Nama Sekolah (Bebas diisi apa saja):</span>
                </label>
                <input
                  type="text"
                  required
                  value={tempSchoolName}
                  onChange={(e) => setTempSchoolName(e.target.value)}
                  placeholder="Contoh: SD Negeri Merdeka 01"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none shadow-xs"
                />
              </div>

              {/* Menu Guru: Bisa diisi nama guru apa saja */}
              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-500" />
                  <span>Nama Guru / Pembimbing (Bebas diisi):</span>
                </label>
                <input
                  type="text"
                  required
                  value={tempTeacherName}
                  onChange={(e) => setTempTeacherName(e.target.value)}
                  placeholder="Contoh: Ibu Siti Rahmawati, S.Pd."
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none shadow-xs"
                />
              </div>

              {/* Pratinjau Teks */}
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-850 border border-amber-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200">
                <span className="font-bold block text-amber-800 dark:text-amber-300 mb-1">
                  💡 Pratinjau Tanda Tangan Sertifikat:
                </span>
                <p>• Kepala Sekolah: <strong>{tempSchoolName || '-'}</strong></p>
                <p>• Guru Pendamping: <strong>{tempTeacherName || '-'}</strong></p>
              </div>

              {saveSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs font-black border border-emerald-300 flex items-center gap-1.5 animate-bounce">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Data sekolah & guru berhasil disimpan!</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSchoolModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-chunky w-1/2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-heading font-black shadow-[0_3px_0_#d97706] border border-amber-500"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* iOS Safari Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-2xl border-4 border-amber-400">
            <h3 className="text-lg font-heading font-black text-slate-800 dark:text-white text-center">
              Pasang di iPhone / iPad
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              1. Ketuk tombol <strong>Bagikan (Share)</strong> di bar bawah Safari.<br />
              2. Gulir ke bawah lalu pilih <strong>Tambah ke Layar Utama (Add to Home Screen)</strong>.<br />
              3. Buka GAMBRENG langsung dari layar depan!
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-4 w-full rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-2.5 text-sm shadow-[0_3px_0_#d97706]"
            >
              Mengerti!
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
