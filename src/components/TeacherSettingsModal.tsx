import React from 'react';
import { X, Sliders, Volume2, RotateCcw, HelpCircle, Check, Play } from 'lucide-react';
import { GameSettings } from '../types/game';
import { soundManager } from '../utils/audio';

interface TeacherSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onRestartGame: () => void;
  onResetAllData?: () => void;
}

export const TeacherSettingsModal: React.FC<TeacherSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onRestartGame,
  onResetAllData,
}) => {
  if (!isOpen) return null;

  const handleTestSound = () => {
    soundManager.playCorrect();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-settings-title"
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border-4 border-slate-200 p-6 md:p-8"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 id="teacher-settings-title" className="text-xl font-black text-slate-900 font-heading">
                Teacher Controls
              </h2>
              <p className="text-xs text-slate-500 font-medium">Quick classroom quiz configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close teacher controls dialog"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 py-6">
          {/* Question Count Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Questions per Session
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([5, 10, 15] as const).map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => onUpdateSettings({ questionCount: count })}
                  className={`py-2.5 px-3 rounded-2xl border-2 font-bold text-sm transition-all flex flex-col items-center justify-center gap-0.5 ${
                    settings.questionCount === count
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{count}</span>
                  <span className="text-[10px] font-semibold opacity-75">
                    {count === 5 ? 'Quick (3m)' : count === 10 ? 'Standard' : 'Complete (15)'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Feedback Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200">
            <div className="flex items-center gap-3">
              <span className="text-xl">🗣️</span>
              <div>
                <span className="block text-sm font-bold text-slate-800">Spoken Voice Feedback</span>
                <span className="block text-xs text-slate-500">Speaks motivational messages aloud</span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ voiceEnabled: !settings.voiceEnabled })}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                settings.voiceEnabled ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform" />
            </button>
          </div>

          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-indigo-600" />
              <div>
                <span className="block text-sm font-bold text-slate-800">Game Sound Effects</span>
                <span className="block text-xs text-slate-500">Audio chimes for correct and wrong answers</span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                settings.soundEnabled ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform" />
            </button>
          </div>

          {/* Riddle Hints Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <div>
                <span className="block text-sm font-bold text-slate-800">Show Byte's Riddle Clues</span>
                <span className="block text-xs text-slate-500">Helps students with friendly hints</span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ showHints: !settings.showHints })}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                settings.showHints ? 'bg-amber-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform" />
            </button>
          </div>

          {/* Quick Sound & Voice Tests */}
          <div className="flex items-center justify-between px-1 gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleTestSound}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 py-1 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Test Chime</span>
            </button>
            <button
              type="button"
              onClick={() => {
                import('../utils/speech').then(({ speechManager }) => {
                  speechManager.testVoice("Voice test! Host Byte is ready to help Class 5 champions learn in English!");
                });
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 py-1 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Test Host Voice (English)</span>
            </button>
          </div>

          {/* Active Voice Information */}
          <div className="px-3.5 py-2 rounded-xl bg-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
            <span className="font-semibold">Speech Engine:</span>
            <span className="font-bold text-indigo-700 truncate max-w-[200px]">Natural English (en-US)</span>
          </div>

          {/* Restart Session & Reset Data Buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => {
                onRestartGame();
                onClose();
              }}
              className="w-full py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset & Start Fresh Game</span>
            </button>

            {onResetAllData && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Clear all saved high scores and badge progress for this device?')) {
                    onResetAllData();
                    onClose();
                  }
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Clear All Saved Student Data (New Class)</span>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold font-heading text-sm transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
