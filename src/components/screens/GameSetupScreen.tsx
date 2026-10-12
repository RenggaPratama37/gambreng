import React, { useState } from 'react';
import { Subject, Player, TimeMode } from '../../types/game';
import { CHARACTERS } from '../../data/characters';
import { getCharacterVisual } from '../../data/characterVisuals';
import { CharacterAvatar } from '../common/CharacterAvatar';
import { audio } from '../../utils/audio';
import { Users, Clock, Sparkles, Plus, Trash2, ArrowLeft, Play } from 'lucide-react';

interface GameSetupScreenProps {
  subject: Subject;
  onBack: () => void;
  onStartGame: (players: Player[], timeMode: TimeMode, enableLuckCards: boolean) => void;
}

interface PlayerDraft {
  characterId: string;
  nickname: string;
  ringColor: string;
}

const PLAYER_COLORS = [
  '#ef4444', // Merah
  '#3b82f6', // Biru
  '#10b981', // Hijau
  '#f59e0b', // Kuning/Oranye
  '#8b5cf6', // Ungu
];

export const GameSetupScreen: React.FC<GameSetupScreenProps> = ({
  subject,
  onBack,
  onStartGame,
}) => {
  // 1 to 5 players
  const [playerDrafts, setPlayerDrafts] = useState<PlayerDraft[]>([
    { characterId: 'maria', nickname: '', ringColor: PLAYER_COLORS[0] },
    { characterId: 'andi', nickname: '', ringColor: PLAYER_COLORS[1] },
  ]);

  const [timeMode, setTimeMode] = useState<TimeMode>('30m');
  const [enableLuckCards, setEnableLuckCards] = useState<boolean>(true);

  // Characters already chosen by any player
  const chosenCharacterIds = playerDrafts.map((p) => p.characterId);

  const handleAddPlayer = () => {
    if (playerDrafts.length >= 5) return;
    audio.playClick();
    // Find first available character
    const availableChar = CHARACTERS.find((c) => !chosenCharacterIds.includes(c.id));
    if (availableChar) {
      setPlayerDrafts((prev) => [
        ...prev,
        {
          characterId: availableChar.id,
          nickname: '',
          ringColor: PLAYER_COLORS[prev.length % PLAYER_COLORS.length],
        },
      ]);
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (playerDrafts.length <= 1) return;
    audio.playClick();
    setPlayerDrafts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCharacterChange = (playerIndex: number, newCharId: string) => {
    audio.playClick();
    setPlayerDrafts((prev) =>
      prev.map((draft, idx) => (idx === playerIndex ? { ...draft, characterId: newCharId } : draft))
    );
  };

  const handleNicknameChange = (playerIndex: number, text: string) => {
    // Max 12 characters
    const trimmed = text.slice(0, 12);
    setPlayerDrafts((prev) =>
      prev.map((draft, idx) => (idx === playerIndex ? { ...draft, nickname: trimmed } : draft))
    );
  };

  const handleStart = () => {
    audio.playClick();
    // Convert drafts to official Player objects
    const finalPlayers: Player[] = playerDrafts.map((draft, idx) => {
      const charDef = CHARACTERS.find((c) => c.id === draft.characterId) || CHARACTERS[0];
      const trimmedNickname = draft.nickname.trim();
      const finalNickname = trimmedNickname.length > 0 ? trimmedNickname : charDef.name;

      return {
        id: `player-${idx + 1}`,
        characterId: charDef.id,
        characterName: charDef.name,
        nickname: finalNickname,
        fileName: charDef.fileName,
        color: draft.ringColor,
        currentTile: 1, // Start at tile 1 (RUMAH - START)
        score: 0,
        isFinished: false,
        challengesCompleted: 0,
        storiesShared: 0,
        correctAnswersCount: 0,
      };
    });

    onStartGame(finalPlayers, timeMode, enableLuckCards);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] p-4 max-w-2xl mx-auto pb-12">
      <div className="bg-white/95 dark:bg-slate-900/95 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 dark:border-amber-500/50 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => {
              audio.playClick();
              onBack();
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ganti Pilihan</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-black">
            <span>{subject.icon}</span>
            <span>{subject.name}</span>
          </span>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 dark:text-white text-center mb-1">
          Siapkan Regu Bermain!
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
          Pilih karakter, beri nama panggilan, dan atur waktu permainan (1 - 5 pemain).
        </p>

        {/* Players List */}
        <div className="space-y-4 mb-6">
          {playerDrafts.map((draft, playerIndex) => {
            const currentChar = CHARACTERS.find((c) => c.id === draft.characterId) || CHARACTERS[0];
            return (
              <div
                key={playerIndex}
                className="bg-amber-50/70 dark:bg-slate-800/70 p-4 rounded-2xl border-2 border-amber-200 dark:border-slate-700 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <CharacterAvatar
                      fileName={currentChar.fileName}
                      name={draft.nickname || currentChar.name}
                      size="sm"
                      ringColor={draft.ringColor}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading font-black text-sm text-slate-800 dark:text-white">
                          Pemain {playerIndex + 1}
                        </span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white shadow-xs"
                          style={{ backgroundColor: draft.ringColor }}
                        >
                          {currentChar.name} ({currentChar.origin})
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                        {draft.nickname ? `Panggilan: "${draft.nickname}"` : 'Bisa diganti nama panggilan di bawah'}
                      </span>
                    </div>
                  </div>

                  {playerDrafts.length > 1 && (
                    <button
                      onClick={() => handleRemovePlayer(playerIndex)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs"
                      title="Hapus pemain"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Nickname Input & Character Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  {/* Nickname Input with Hint */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Panggilan (Maks 12 huruf):
                    </label>
                    <input
                      type="text"
                      maxLength={12}
                      value={draft.nickname}
                      onChange={(e) => handleNicknameChange(playerIndex, e.target.value)}
                      placeholder={currentChar.name}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 font-bold text-sm text-slate-800 dark:text-white focus:border-amber-500 focus:outline-none shadow-xs"
                    />
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1">
                      💡 Hint: Pakai nama panggilan saja, ya.
                    </p>
                  </div>

                  {/* Character Picker with Origin Label (Dani, Bugis, Batak, Jawa, Dayak) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Pilih Karakter Bidak:
                    </label>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {CHARACTERS.map((char) => {
                        const isChosenByOther =
                          chosenCharacterIds.includes(char.id) && draft.characterId !== char.id;
                        const isSelected = draft.characterId === char.id;

                        return (
                          <button
                            key={char.id}
                            type="button"
                            disabled={isChosenByOther}
                            onClick={() => handleCharacterChange(playerIndex, char.id)}
                            className={`relative flex flex-col items-center p-1.5 rounded-xl border-2 transition-all shrink-0 ${
                              isSelected
                                ? 'bg-amber-200 dark:bg-amber-950 border-amber-500 shadow-md scale-105 animate-wobble'
                                : isChosenByOther
                                ? 'opacity-30 cursor-not-allowed bg-slate-100 dark:bg-slate-800 border-transparent'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                            }`}
                          >
                            {/* Normal Image Element - Uniform size for all */}
                            <div className="h-14 sm:h-16 w-12 sm:w-14 flex items-end justify-center overflow-visible">
                              {(() => {
                                const visual = getCharacterVisual(char.fileName);
                                return (
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
                                );
                              })()}
                            </div>
                            <span className="text-[10px] font-black text-slate-800 dark:text-white mt-0.5">
                              {char.name}
                            </span>
                            {/* Origin Label shown only here in picker */}
                            <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400">
                              ({char.origin})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Player Button (Up to 5) */}
        {playerDrafts.length < 5 && (
          <button
            onClick={handleAddPlayer}
            className="w-full py-2.5 px-4 mb-6 rounded-2xl border-2 border-dashed border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-slate-800/50 hover:bg-amber-100 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pemain ({playerDrafts.length}/5)</span>
          </button>
        )}

        {/* Time Mode Selection */}
        <div className="mb-6">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Batas Waktu Permainan:</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '30m', label: '30 Menit' },
              { id: '60m', label: '60 Menit' },
              { id: 'unlimited', label: 'Tanpa Batas' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  audio.playClick();
                  setTimeMode(mode.id as TimeMode);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-heading font-black border-2 transition-all text-center ${
                  timeMode === mode.id
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-[0_3px_0_#d97706]'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Luck Cards Toggle */}
        <div className="mb-8 p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-purple-950 dark:text-purple-200">
                Kartu Keberuntungan (Bintang Ungu ⭐)
              </span>
              <span className="block text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                Petak kejutan dengan bonus poin atau lompatan ekstra
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              setEnableLuckCards(!enableLuckCards);
            }}
            className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
              enableLuckCards ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                enableLuckCards ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Big Start Game Button */}
        <button
          onClick={handleStart}
          className="btn-chunky w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-600 hover:to-teal-600 text-white font-heading font-black text-xl shadow-[0_8px_0_#065f46] border-2 border-emerald-300"
        >
          <span>Mulai Bermain Sekarang!</span>
          <Play className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};
