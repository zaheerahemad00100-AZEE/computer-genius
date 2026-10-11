import React from 'react';
import { Volume2, VolumeX, Settings, Sparkles, Flame } from 'lucide-react';

interface NavbarProps {
  soundEnabled: boolean;
  voiceEnabled: boolean;
  onToggleSound: () => void;
  onToggleVoice: () => void;
  onOpenTeacherSettings: () => void;
  score: number;
  streak: number;
  showInGameStats?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  voiceEnabled,
  onToggleSound,
  onToggleVoice,
  onOpenTeacherSettings,
  score,
  streak,
  showInGameStats = false,
}) => {
  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
            ⚡
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-heading block leading-tight whitespace-nowrap">
              TechVerse
            </span>
            <span className="text-xs font-semibold text-indigo-600 hidden sm:block">
              The Talking Computer Adventure · Host Byte
            </span>
          </div>
        </div>

        {/* Zone 2: Middle stats if playing or clean text */}
        <div className="flex items-center gap-4">
          {showInGameStats ? (
            <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-bold">
              {/* Score Display */}
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-100">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Score:</span>
                <span className="font-extrabold text-blue-900 tabular-nums text-sm sm:text-base">{score}</span>
              </div>

              {/* Streak Counter */}
              {streak > 0 && (
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all ${
                  streak >= 3
                    ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  <Flame className={`w-4 h-4 ${streak >= 3 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                  <span>Streak:</span>
                  <span className="font-black text-amber-800 tabular-nums">{streak}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500">
              <span>Interactive Quiz</span>
              <span aria-hidden="true">·</span>
              <span>15 Key Components</span>
              <span aria-hidden="true">·</span>
              <span>Voice Feedback Ready</span>
            </div>
          )}
        </div>

        {/* Zone 3: Interactive Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Voice Feedback Toggle Button */}
          <button
            onClick={onToggleVoice}
            aria-label={voiceEnabled ? 'Mute voice feedback' : 'Enable voice feedback'}
            className={`h-10 px-2.5 sm:px-3 rounded-xl flex items-center gap-1.5 border transition-colors text-xs font-bold ${
              voiceEnabled
                ? 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                : 'border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={voiceEnabled ? 'Voice is ON - Click to Mute Voice' : 'Voice is OFF - Click to Turn On Voice'}
          >
            <span className="text-base">{voiceEnabled ? '🗣️' : '🤫'}</span>
            <span className="hidden sm:inline">{voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
          </button>

          {/* Sound FX Toggle Button */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title={soundEnabled ? 'Sound FX is ON - Click to Mute' : 'Sound FX is OFF - Click to Turn On'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-indigo-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {/* Teacher Settings Button */}
          <button
            onClick={onOpenTeacherSettings}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
            title="Open Teacher / Classroom Settings"
          >
            <Settings className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};
